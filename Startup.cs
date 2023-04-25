using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using Nostreets.Extensions.DataControl.Classes;
using Nostreets.Extensions.Extend.Basic;
using Nostreets.Extensions.Interfaces;
using Nostreets.Orm.Ado;
using Nostreets.Orm.EF;
using Nostreets.Web.Interceptor;
using Nostreets.Web.Router.Models;

using Nostreets_Services.Classes.Domain.Bills;
using Nostreets_Services.Classes.Domain.Charts;
using Nostreets_Services.Classes.Domain.Users;
using Nostreets_Services.Classes.Domain.Utilities;
using Nostreets_Services.Interfaces.Services;
using Nostreets_Services.Models.Request;
using Nostreets_Services.Services.Database;
using Nostreets_Services.Services.Email;
using Nostreets_Services.Services.Shopify;

namespace Nostreets_Sandbox_Core
{
    public class Startup
    {
        public Startup(IConfiguration config, IWebHostEnvironment env) 
        {
            Configuration = config;
            Environment = env;
        }
        
        public IConfiguration Configuration { get; set; }
        public IWebHostEnvironment Environment { get; set; }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                //endpoints.MapFallbackToPage("/Nostreets/Index");
            });


            app.UseRequestInterceptor("Nosteets");
            app.UseHealthChecks("/health");
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddRazorPages();
            services.AddDistributedMemoryCache(); // Use an in-memory cache for session data
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(30); // Set the session timeout period
                options.Cookie.HttpOnly = true; // Set the session cookie as HttpOnly
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Set the session cookie as Secure
            });
            services.AddHealthChecks();

            #region Custom Services
            string connectionString = Configuration["ConnectionStrings:Azure"];
            services.AddSingleton(new ServiceCollectionWrapper(services));
            services.AddSingleton(typeof(IDBService<>), typeof(EFDBService<>));
            services.AddSingleton(typeof(IDBService<,>), typeof(EFDBService<,>));
            services.AddSingleton(typeof(IDBService<,,,>), typeof(EFDBService<,,,>));

            // Build an intermediate service provider
            var serviceProvider = services.BuildServiceProvider();

            // Resolve the services from the service provider
            services.AddSingleton<IBillService, BillService>(
                a =>
                {
                    var incomeSrv = serviceProvider.GetService<IDBService<Income>>();
                    var expenseSrv = serviceProvider.GetService<IDBService<Expense>>();
                    return new BillService(incomeSrv, expenseSrv);
                }
            );

            services.AddSingleton<IChartService, ChartsService>(
                a =>
                {
                    var chartDBSrv = serviceProvider.GetService<IDBService<Chart<List<int>>, int, ChartAddRequest, ChartUpdateRequest>>();
                    var pieDBSrv = serviceProvider.GetService<IDBService<Chart<int>, int, ChartAddRequest<int>, ChartUpdateRequest<int>>>();
                    return new ChartsService(chartDBSrv, pieDBSrv);
                }
            );

            services.AddSingleton<IEmailService, SendGridService>(a => new SendGridService(Configuration["AppSettings:SendGridApiKey"]));
            services.AddSingleton<IUserService, UserService>(
                a =>
                {
                    var serviceCollection = serviceProvider.GetService<ServiceCollectionWrapper>();
                    var emailSrv = serviceProvider.GetService<IEmailService>();
                    var userSrv = serviceProvider.GetService<IDBService<User, string>>();
                    var userDataSrv = serviceProvider.GetService<IDBService<UserData, int>>();
                    var tokenSrv = serviceProvider.GetService<IDBService<Token, string>>();
                    var errorSrv = serviceProvider.GetService<IDBService<Error>>();
                    return new UserService(serviceCollection, Environment as Microsoft.AspNetCore.Hosting.IHostingEnvironment, Configuration, emailSrv, userSrv, userDataSrv, tokenSrv, errorSrv);
                }
            );

            services.AddSingleton<IShopifyService, ShopifyService>(); 
            #endregion

        }
    }
}
