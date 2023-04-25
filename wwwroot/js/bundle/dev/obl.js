/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var pJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.pJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        bubble:{
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse:{
          distance: 200,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
      mouse:{}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var pJS = this.pJS;

  /* params settings */
  if(params){
    Object.deepExtend(pJS, params);
  }

  pJS.tmp.obj = {
    size_value: pJS.particles.size.value,
    size_anim_speed: pJS.particles.size.anim.speed,
    move_speed: pJS.particles.move.speed,
    line_linked_distance: pJS.particles.line_linked.distance,
    line_linked_width: pJS.particles.line_linked.width,
    mode_grab_distance: pJS.interactivity.modes.grab.distance,
    mode_bubble_distance: pJS.interactivity.modes.bubble.distance,
    mode_bubble_size: pJS.interactivity.modes.bubble.size,
    mode_repulse_distance: pJS.interactivity.modes.repulse.distance
  };


  pJS.fn.retinaInit = function(){

    if(pJS.retina_detect && window.devicePixelRatio > 1){
      pJS.canvas.pxratio = window.devicePixelRatio; 
      pJS.tmp.retina = true;
    } 
    else{
      pJS.canvas.pxratio = 1;
      pJS.tmp.retina = false;
    }

    pJS.canvas.w = pJS.canvas.el.offsetWidth * pJS.canvas.pxratio;
    pJS.canvas.h = pJS.canvas.el.offsetHeight * pJS.canvas.pxratio;

    pJS.particles.size.value = pJS.tmp.obj.size_value * pJS.canvas.pxratio;
    pJS.particles.size.anim.speed = pJS.tmp.obj.size_anim_speed * pJS.canvas.pxratio;
    pJS.particles.move.speed = pJS.tmp.obj.move_speed * pJS.canvas.pxratio;
    pJS.particles.line_linked.distance = pJS.tmp.obj.line_linked_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.grab.distance = pJS.tmp.obj.mode_grab_distance * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.distance = pJS.tmp.obj.mode_bubble_distance * pJS.canvas.pxratio;
    pJS.particles.line_linked.width = pJS.tmp.obj.line_linked_width * pJS.canvas.pxratio;
    pJS.interactivity.modes.bubble.size = pJS.tmp.obj.mode_bubble_size * pJS.canvas.pxratio;
    pJS.interactivity.modes.repulse.distance = pJS.tmp.obj.mode_repulse_distance * pJS.canvas.pxratio;

  };



  /* ---------- pJS functions - canvas ------------ */

  pJS.fn.canvasInit = function(){
    pJS.canvas.ctx = pJS.canvas.el.getContext('2d');
  };

  pJS.fn.canvasSize = function(){

    pJS.canvas.el.width = pJS.canvas.w;
    pJS.canvas.el.height = pJS.canvas.h;

    if(pJS && pJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          pJS.canvas.w = pJS.canvas.el.offsetWidth;
          pJS.canvas.h = pJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(pJS.tmp.retina){
            pJS.canvas.w *= pJS.canvas.pxratio;
            pJS.canvas.h *= pJS.canvas.pxratio;
          }

          pJS.canvas.el.width = pJS.canvas.w;
          pJS.canvas.el.height = pJS.canvas.h;

          /* repaint canvas on anim disabled */
          if(!pJS.particles.move.enable){
            pJS.fn.particlesEmpty();
            pJS.fn.particlesCreate();
            pJS.fn.particlesDraw();
            pJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        pJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  pJS.fn.canvasPaint = function(){
    pJS.canvas.ctx.fillRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };

  pJS.fn.canvasClear = function(){
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);
  };


  /* --------- pJS functions - particles ----------- */

  pJS.fn.particle = function(color, opacity, position){

    /* size */
    this.radius = (pJS.particles.size.random ? Math.random() : 1) * pJS.particles.size.value;
    if(pJS.particles.size.anim.enable){
      this.size_status = false;
      this.vs = pJS.particles.size.anim.speed / 100;
      if(!pJS.particles.size.anim.sync){
        this.vs = this.vs * Math.random();
      }
    }

    /* position */
    this.x = position ? position.x : Math.random() * pJS.canvas.w;
    this.y = position ? position.y : Math.random() * pJS.canvas.h;

    /* check position  - into the canvas */
    if(this.x > pJS.canvas.w - this.radius*2) this.x = this.x - this.radius;
    else if(this.x < this.radius*2) this.x = this.x + this.radius;
    if(this.y > pJS.canvas.h - this.radius*2) this.y = this.y - this.radius;
    else if(this.y < this.radius*2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if(pJS.particles.move.bounce){
      pJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if(typeof(color.value) == 'object'){

      if(color.value instanceof Array){
        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      }else{
        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if(color.value == 'random'){
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if(typeof(color.value) == 'string'){
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (pJS.particles.opacity.random ? Math.random() : 1) * pJS.particles.opacity.value;
    if(pJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = pJS.particles.opacity.anim.speed / 100;
      if(!pJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }

    /* animation - velocity for speed */
    var velbase = {}
    switch(pJS.particles.move.direction){
      case 'top':
        velbase = { x:0, y:-1 };
      break;
      case 'top-right':
        velbase = { x:0.5, y:-0.5 };
      break;
      case 'right':
        velbase = { x:1, y:-0 };
      break;
      case 'bottom-right':
        velbase = { x:0.5, y:0.5 };
      break;
      case 'bottom':
        velbase = { x:0, y:1 };
      break;
      case 'bottom-left':
        velbase = { x:-0.5, y:1 };
      break;
      case 'left':
        velbase = { x:-1, y:0 };
      break;
      case 'top-left':
        velbase = { x:-0.5, y:-0.5 };
      break;
      default:
        velbase = { x:0, y:0 };
      break;
    }

    if(pJS.particles.move.straight){
      this.vx = velbase.x;
      this.vy = velbase.y;
      if(pJS.particles.move.random){
        this.vx = this.vx * (Math.random());
        this.vy = this.vy * (Math.random());
      }
    }else{
      this.vx = velbase.x + Math.random()-0.5;
      this.vy = velbase.y + Math.random()-0.5;
    }

    // var theta = 2.0 * Math.PI * Math.random();
    // this.vx = Math.cos(theta);
    // this.vy = Math.sin(theta);

    this.vx_i = this.vx;
    this.vy_i = this.vy;

    

    /* if shape is image */

    var shape_type = pJS.particles.shape.type;
    if(typeof(shape_type) == 'object'){
      if(shape_type instanceof Array){
        var shape_selected = shape_type[Math.floor(Math.random() * shape_type.length)];
        this.shape = shape_selected;
      }
    }else{
      this.shape = shape_type;
    }

    if(this.shape == 'image'){
      var sh = pJS.particles.shape;
      this.img = {
        src: sh.image.src,
        ratio: sh.image.width / sh.image.height
      }
      if(!this.img.ratio) this.img.ratio = 1;
      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg != undefined){
        pJS.fn.vendors.createSvgImg(this);
        if(pJS.tmp.pushing){
          this.img.loaded = false;
        }
      }
    }

    

  };


  pJS.fn.particle.prototype.draw = function() {

    var p = this;

    if(p.radius_bubble != undefined){
      var radius = p.radius_bubble; 
    }else{
      var radius = p.radius;
    }

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
    }

    pJS.canvas.ctx.fillStyle = color_value;
    pJS.canvas.ctx.beginPath();

    switch(p.shape){

      case 'circle':
        pJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
      break;

      case 'edge':
        pJS.canvas.ctx.rect(p.x-radius, p.y-radius, radius*2, radius*2);
      break;

      case 'triangle':
        pJS.fn.vendors.drawShape(pJS.canvas.ctx, p.x-radius, p.y+radius / 1.66, radius*2, 3, 2);
      break;

      case 'polygon':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius / (pJS.particles.shape.polygon.nb_sides/3.5), // startX
          p.y - radius / (2.66/3.5), // startY
          radius*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          1 // sideCountDenominator
        );
      break;

      case 'star':
        pJS.fn.vendors.drawShape(
          pJS.canvas.ctx,
          p.x - radius*2 / (pJS.particles.shape.polygon.nb_sides/4), // startX
          p.y - radius / (2*2.66/3.5), // startY
          radius*2*2.66 / (pJS.particles.shape.polygon.nb_sides/3), // sideLength
          pJS.particles.shape.polygon.nb_sides, // sideCountNumerator
          2 // sideCountDenominator
        );
      break;

      case 'image':

        function draw(){
          pJS.canvas.ctx.drawImage(
            img_obj,
            p.x-radius,
            p.y-radius,
            radius*2,
            radius*2 / p.img.ratio
          );
        }

        if(pJS.tmp.img_type == 'svg'){
          var img_obj = p.img.obj;
        }else{
          var img_obj = pJS.tmp.img_obj;
        }

        if(img_obj){
          draw();
        }

      break;

    }

    pJS.canvas.ctx.closePath();

    if(pJS.particles.shape.stroke.width > 0){
      pJS.canvas.ctx.strokeStyle = pJS.particles.shape.stroke.color;
      pJS.canvas.ctx.lineWidth = pJS.particles.shape.stroke.width;
      pJS.canvas.ctx.stroke();
    }
    
    pJS.canvas.ctx.fill();
    
  };


  pJS.fn.particlesCreate = function(){
    for(var i = 0; i < pJS.particles.number.value; i++) {
      pJS.particles.array.push(new pJS.fn.particle(pJS.particles.color, pJS.particles.opacity.value));
    }
  };

  pJS.fn.particlesUpdate = function(){

    for(var i = 0; i < pJS.particles.array.length; i++){

      /* the particle */
      var p = pJS.particles.array[i];

      // var d = ( dx = pJS.interactivity.mouse.click_pos_x - p.x ) * dx + ( dy = pJS.interactivity.mouse.click_pos_y - p.y ) * dy;
      // var f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     var t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }

      /* move the particle */
      if(pJS.particles.move.enable){
        var ms = pJS.particles.move.speed/2;
        p.x += p.vx * ms;
        p.y += p.vy * ms;
      }

      /* change opacity status */
      if(pJS.particles.opacity.anim.enable) {
        if(p.opacity_status == true) {
          if(p.opacity >= pJS.particles.opacity.value) p.opacity_status = false;
          p.opacity += p.vo;
        }else {
          if(p.opacity <= pJS.particles.opacity.anim.opacity_min) p.opacity_status = true;
          p.opacity -= p.vo;
        }
        if(p.opacity < 0) p.opacity = 0;
      }

      /* change size */
      if(pJS.particles.size.anim.enable){
        if(p.size_status == true){
          if(p.radius >= pJS.particles.size.value) p.size_status = false;
          p.radius += p.vs;
        }else{
          if(p.radius <= pJS.particles.size.anim.size_min) p.size_status = true;
          p.radius -= p.vs;
        }
        if(p.radius < 0) p.radius = 0;
      }

      /* change particle position if it is out of canvas */
      if(pJS.particles.move.out_mode == 'bounce'){
        var new_pos = {
          x_left: p.radius,
          x_right:  pJS.canvas.w,
          y_top: p.radius,
          y_bottom: pJS.canvas.h
        }
      }else{
        var new_pos = {
          x_left: -p.radius,
          x_right: pJS.canvas.w + p.radius,
          y_top: -p.radius,
          y_bottom: pJS.canvas.h + p.radius
        }
      }

      if(p.x - p.radius > pJS.canvas.w){
        p.x = new_pos.x_left;
        p.y = Math.random() * pJS.canvas.h;
      }
      else if(p.x + p.radius < 0){
        p.x = new_pos.x_right;
        p.y = Math.random() * pJS.canvas.h;
      }
      if(p.y - p.radius > pJS.canvas.h){
        p.y = new_pos.y_top;
        p.x = Math.random() * pJS.canvas.w;
      }
      else if(p.y + p.radius < 0){
        p.y = new_pos.y_bottom;
        p.x = Math.random() * pJS.canvas.w;
      }

      /* out of canvas modes */
      switch(pJS.particles.move.out_mode){
        case 'bounce':
          if (p.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
          else if (p.x - p.radius < 0) p.vx = -p.vx;
          if (p.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
          else if (p.y - p.radius < 0) p.vy = -p.vy;
        break;
      }

      /* events */
      if(isInArray('grab', pJS.interactivity.events.onhover.mode)){
        pJS.fn.modes.grabParticle(p);
      }

      if(isInArray('bubble', pJS.interactivity.events.onhover.mode) || isInArray('bubble', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.bubbleParticle(p);
      }

      if(isInArray('repulse', pJS.interactivity.events.onhover.mode) || isInArray('repulse', pJS.interactivity.events.onclick.mode)){
        pJS.fn.modes.repulseParticle(p);
      }

      /* interaction auto between particles */
      if(pJS.particles.line_linked.enable || pJS.particles.move.attract.enable){
        for(var j = i + 1; j < pJS.particles.array.length; j++){
          var p2 = pJS.particles.array[j];

          /* link particles */
          if(pJS.particles.line_linked.enable){
            pJS.fn.interact.linkParticles(p,p2);
          }

          /* attract particles */
          if(pJS.particles.move.attract.enable){
            pJS.fn.interact.attractParticles(p,p2);
          }

          /* bounce particles */
          if(pJS.particles.move.bounce){
            pJS.fn.interact.bounceParticles(p,p2);
          }

        }
      }


    }

  };

  pJS.fn.particlesDraw = function(){

    /* clear canvas */
    pJS.canvas.ctx.clearRect(0, 0, pJS.canvas.w, pJS.canvas.h);

    /* update each particles param */
    pJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p = pJS.particles.array[i];
      p.draw();
    }

  };

  pJS.fn.particlesEmpty = function(){
    pJS.particles.array = [];
  };

  pJS.fn.particlesRefresh = function(){

    /* init all */
    cancelRequestAnimFrame(pJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
    pJS.tmp.source_svg = undefined;
    pJS.tmp.img_obj = undefined;
    pJS.tmp.count_svg = 0;
    pJS.fn.particlesEmpty();
    pJS.fn.canvasClear();
    
    /* restart */
    pJS.fn.vendors.start();

  };


  /* ---------- pJS functions - particles interaction ------------ */

  pJS.fn.interact.linkParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if(dist <= pJS.particles.line_linked.distance){

      var opacity_line = pJS.particles.line_linked.opacity - (dist / (1/pJS.particles.line_linked.opacity)) / pJS.particles.line_linked.distance;

      if(opacity_line > 0){        
        
        /* style */
        var color_line = pJS.particles.line_linked.color_rgb_line;
        pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
        pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
        //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
        
        /* path */
        pJS.canvas.ctx.beginPath();
        pJS.canvas.ctx.moveTo(p1.x, p1.y);
        pJS.canvas.ctx.lineTo(p2.x, p2.y);
        pJS.canvas.ctx.stroke();
        pJS.canvas.ctx.closePath();

      }

    }

  };


  pJS.fn.interact.attractParticles  = function(p1, p2){

    /* condensed particles */
    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy);

    if(dist <= pJS.particles.line_linked.distance){

      var ax = dx/(pJS.particles.move.attract.rotateX*1000),
          ay = dy/(pJS.particles.move.attract.rotateY*1000);

      p1.vx -= ax;
      p1.vy -= ay;

      p2.vx += ax;
      p2.vy += ay;

    }
    

  }


  pJS.fn.interact.bounceParticles = function(p1, p2){

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy),
        dist_p = p1.radius+p2.radius;

    if(dist <= dist_p){
      p1.vx = -p1.vx;
      p1.vy = -p1.vy;

      p2.vx = -p2.vx;
      p2.vy = -p2.vy;
    }

  }


  /* ---------- pJS functions - modes events ------------ */

  pJS.fn.modes.pushParticles = function(nb, pos){

    pJS.tmp.pushing = true;

    for(var i = 0; i < nb; i++){
      pJS.particles.array.push(
        new pJS.fn.particle(
          pJS.particles.color,
          pJS.particles.opacity.value,
          {
            'x': pos ? pos.pos_x : Math.random() * pJS.canvas.w,
            'y': pos ? pos.pos_y : Math.random() * pJS.canvas.h
          }
        )
      )
      if(i == nb-1){
        if(!pJS.particles.move.enable){
          pJS.fn.particlesDraw();
        }
        pJS.tmp.pushing = false;
      }
    }

  };


  pJS.fn.modes.removeParticles = function(nb){

    pJS.particles.array.splice(0, nb);
    if(!pJS.particles.move.enable){
      pJS.fn.particlesDraw();
    }

  };


  pJS.fn.modes.bubbleParticle = function(p){

    /* on hover event */
    if(pJS.interactivity.events.onhover.enable && isInArray('bubble', pJS.interactivity.events.onhover.mode)){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
          ratio = 1 - dist_mouse / pJS.interactivity.modes.bubble.distance;

      function init(){
        p.opacity_bubble = p.opacity;
        p.radius_bubble = p.radius;
      }

      /* mousemove - check ratio */
      if(dist_mouse <= pJS.interactivity.modes.bubble.distance){

        if(ratio >= 0 && pJS.interactivity.status == 'mousemove'){
          
          /* size */
          if(pJS.interactivity.modes.bubble.size != pJS.particles.size.value){

            if(pJS.interactivity.modes.bubble.size > pJS.particles.size.value){
              var size = p.radius + (pJS.interactivity.modes.bubble.size*ratio);
              if(size >= 0){
                p.radius_bubble = size;
              }
            }else{
              var dif = p.radius - pJS.interactivity.modes.bubble.size,
                  size = p.radius - (dif*ratio);
              if(size > 0){
                p.radius_bubble = size;
              }else{
                p.radius_bubble = 0;
              }
            }

          }

          /* opacity */
          if(pJS.interactivity.modes.bubble.opacity != pJS.particles.opacity.value){

            if(pJS.interactivity.modes.bubble.opacity > pJS.particles.opacity.value){
              var opacity = pJS.interactivity.modes.bubble.opacity*ratio;
              if(opacity > p.opacity && opacity <= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }else{
              var opacity = p.opacity - (pJS.particles.opacity.value-pJS.interactivity.modes.bubble.opacity)*ratio;
              if(opacity < p.opacity && opacity >= pJS.interactivity.modes.bubble.opacity){
                p.opacity_bubble = opacity;
              }
            }

          }

        }

      }else{
        init();
      }


      /* mouseleave */
      if(pJS.interactivity.status == 'mouseleave'){
        init();
      }
    
    }

    /* on click event */
    else if(pJS.interactivity.events.onclick.enable && isInArray('bubble', pJS.interactivity.events.onclick.mode)){


      if(pJS.tmp.bubble_clicking){
        var dx_mouse = p.x - pJS.interactivity.mouse.click_pos_x,
            dy_mouse = p.y - pJS.interactivity.mouse.click_pos_y,
            dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse),
            time_spent = (new Date().getTime() - pJS.interactivity.mouse.click_time)/1000;

        if(time_spent > pJS.interactivity.modes.bubble.duration){
          pJS.tmp.bubble_duration_end = true;
        }

        if(time_spent > pJS.interactivity.modes.bubble.duration*2){
          pJS.tmp.bubble_clicking = false;
          pJS.tmp.bubble_duration_end = false;
        }
      }


      function process(bubble_param, particles_param, p_obj_bubble, p_obj, id){

        if(bubble_param != particles_param){

          if(!pJS.tmp.bubble_duration_end){
            if(dist_mouse <= pJS.interactivity.modes.bubble.distance){
              if(p_obj_bubble != undefined) var obj = p_obj_bubble;
              else var obj = p_obj;
              if(obj != bubble_param){
                var value = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration);
                if(id == 'size') p.radius_bubble = value;
                if(id == 'opacity') p.opacity_bubble = value;
              }
            }else{
              if(id == 'size') p.radius_bubble = undefined;
              if(id == 'opacity') p.opacity_bubble = undefined;
            }
          }else{
            if(p_obj_bubble != undefined){
              var value_tmp = p_obj - (time_spent * (p_obj - bubble_param) / pJS.interactivity.modes.bubble.duration),
                  dif = bubble_param - value_tmp;
                  value = bubble_param + dif;
              if(id == 'size') p.radius_bubble = value;
              if(id == 'opacity') p.opacity_bubble = value;
            }
          }

        }

      }

      if(pJS.tmp.bubble_clicking){
        /* size */
        process(pJS.interactivity.modes.bubble.size, pJS.particles.size.value, p.radius_bubble, p.radius, 'size');
        /* opacity */
        process(pJS.interactivity.modes.bubble.opacity, pJS.particles.opacity.value, p.opacity_bubble, p.opacity, 'opacity');
      }

    }

  };


  pJS.fn.modes.repulseParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && isInArray('repulse', pJS.interactivity.events.onhover.mode) && pJS.interactivity.status == 'mousemove') {

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      var normVec = {x: dx_mouse/dist_mouse, y: dy_mouse/dist_mouse},
          repulseRadius = pJS.interactivity.modes.repulse.distance,
          velocity = 100,
          repulseFactor = clamp((1/repulseRadius)*(-1*Math.pow(dist_mouse/repulseRadius,2)+1)*repulseRadius*velocity, 0, 50);
      
      var pos = {
        x: p.x + normVec.x * repulseFactor,
        y: p.y + normVec.y * repulseFactor
      }

      if(pJS.particles.move.out_mode == 'bounce'){
        if(pos.x - p.radius > 0 && pos.x + p.radius < pJS.canvas.w) p.x = pos.x;
        if(pos.y - p.radius > 0 && pos.y + p.radius < pJS.canvas.h) p.y = pos.y;
      }else{
        p.x = pos.x;
        p.y = pos.y;
      }
    
    }


    else if(pJS.interactivity.events.onclick.enable && isInArray('repulse', pJS.interactivity.events.onclick.mode)) {

      if(!pJS.tmp.repulse_finish){
        pJS.tmp.repulse_count++;
        if(pJS.tmp.repulse_count == pJS.particles.array.length){
          pJS.tmp.repulse_finish = true;
        }
      }

      if(pJS.tmp.repulse_clicking){

        var repulseRadius = Math.pow(pJS.interactivity.modes.repulse.distance/6, 3);

        var dx = pJS.interactivity.mouse.click_pos_x - p.x,
            dy = pJS.interactivity.mouse.click_pos_y - p.y,
            d = dx*dx + dy*dy;

        var force = -repulseRadius / d * 1;

        function process(){

          var f = Math.atan2(dy,dx);
          p.vx = force * Math.cos(f);
          p.vy = force * Math.sin(f);

          if(pJS.particles.move.out_mode == 'bounce'){
            var pos = {
              x: p.x + p.vx,
              y: p.y + p.vy
            }
            if (pos.x + p.radius > pJS.canvas.w) p.vx = -p.vx;
            else if (pos.x - p.radius < 0) p.vx = -p.vx;
            if (pos.y + p.radius > pJS.canvas.h) p.vy = -p.vy;
            else if (pos.y - p.radius < 0) p.vy = -p.vy;
          }

        }

        // default
        if(d <= repulseRadius){
          process();
        }

        // bang - slow motion mode
        // if(!pJS.tmp.repulse_finish){
        //   if(d <= repulseRadius){
        //     process();
        //   }
        // }else{
        //   process();
        // }
        

      }else{

        if(pJS.tmp.repulse_clicking == false){

          p.vx = p.vx_i;
          p.vy = p.vy_i;
        
        }

      }

    }

  }


  pJS.fn.modes.grabParticle = function(p){

    if(pJS.interactivity.events.onhover.enable && pJS.interactivity.status == 'mousemove'){

      var dx_mouse = p.x - pJS.interactivity.mouse.pos_x,
          dy_mouse = p.y - pJS.interactivity.mouse.pos_y,
          dist_mouse = Math.sqrt(dx_mouse*dx_mouse + dy_mouse*dy_mouse);

      /* draw a line between the cursor and the particle if the distance between them is under the config distance */
      if(dist_mouse <= pJS.interactivity.modes.grab.distance){

        var opacity_line = pJS.interactivity.modes.grab.line_linked.opacity - (dist_mouse / (1/pJS.interactivity.modes.grab.line_linked.opacity)) / pJS.interactivity.modes.grab.distance;

        if(opacity_line > 0){

          /* style */
          var color_line = pJS.particles.line_linked.color_rgb_line;
          pJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
          pJS.canvas.ctx.lineWidth = pJS.particles.line_linked.width;
          //pJS.canvas.ctx.lineCap = 'round'; /* performance issue */
          
          /* path */
          pJS.canvas.ctx.beginPath();
          pJS.canvas.ctx.moveTo(p.x, p.y);
          pJS.canvas.ctx.lineTo(pJS.interactivity.mouse.pos_x, pJS.interactivity.mouse.pos_y);
          pJS.canvas.ctx.stroke();
          pJS.canvas.ctx.closePath();

        }

      }

    }

  };



  /* ---------- pJS functions - vendors ------------ */

  pJS.fn.vendors.eventsListeners = function(){

    /* events target element */
    if(pJS.interactivity.detect_on == 'window'){
      pJS.interactivity.el = window;
    }else{
      pJS.interactivity.el = pJS.canvas.el;
    }


    /* detect mouse pos - on hover / click event */
    if(pJS.interactivity.events.onhover.enable || pJS.interactivity.events.onclick.enable){

      /* el on mousemove */
      pJS.interactivity.el.addEventListener('mousemove', function(e){

        if(pJS.interactivity.el == window){
          var pos_x = e.clientX,
              pos_y = e.clientY;
        }
        else{
          var pos_x = e.offsetX || e.clientX,
              pos_y = e.offsetY || e.clientY;
        }

        pJS.interactivity.mouse.pos_x = pos_x;
        pJS.interactivity.mouse.pos_y = pos_y;

        if(pJS.tmp.retina){
          pJS.interactivity.mouse.pos_x *= pJS.canvas.pxratio;
          pJS.interactivity.mouse.pos_y *= pJS.canvas.pxratio;
        }

        pJS.interactivity.status = 'mousemove';

      });

      /* el on onmouseleave */
      pJS.interactivity.el.addEventListener('mouseleave', function(e){

        pJS.interactivity.mouse.pos_x = null;
        pJS.interactivity.mouse.pos_y = null;
        pJS.interactivity.status = 'mouseleave';

      });

    }

    /* on click event */
    if(pJS.interactivity.events.onclick.enable){

      pJS.interactivity.el.addEventListener('click', function(){

        pJS.interactivity.mouse.click_pos_x = pJS.interactivity.mouse.pos_x;
        pJS.interactivity.mouse.click_pos_y = pJS.interactivity.mouse.pos_y;
        pJS.interactivity.mouse.click_time = new Date().getTime();

        if(pJS.interactivity.events.onclick.enable){

          switch(pJS.interactivity.events.onclick.mode){

            case 'push':
              if(pJS.particles.move.enable){
                pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
              }else{
                if(pJS.interactivity.modes.push.particles_nb == 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb, pJS.interactivity.mouse);
                }
                else if(pJS.interactivity.modes.push.particles_nb > 1){
                  pJS.fn.modes.pushParticles(pJS.interactivity.modes.push.particles_nb);
                }
              }
            break;

            case 'remove':
              pJS.fn.modes.removeParticles(pJS.interactivity.modes.remove.particles_nb);
            break;

            case 'bubble':
              pJS.tmp.bubble_clicking = true;
            break;

            case 'repulse':
              pJS.tmp.repulse_clicking = true;
              pJS.tmp.repulse_count = 0;
              pJS.tmp.repulse_finish = false;
              setTimeout(function(){
                pJS.tmp.repulse_clicking = false;
              }, pJS.interactivity.modes.repulse.duration*1000)
            break;

          }

        }

      });
        
    }


  };

  pJS.fn.vendors.densityAutoParticles = function(){

    if(pJS.particles.number.density.enable){

      /* calc area */
      var area = pJS.canvas.el.width * pJS.canvas.el.height / 1000;
      if(pJS.tmp.retina){
        area = area/(pJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * pJS.particles.number.value / pJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = pJS.particles.array.length - nb_particles;
      if(missing_particles < 0) pJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else pJS.fn.modes.removeParticles(missing_particles);

    }

  };


  pJS.fn.vendors.checkOverlap = function(p1, position){
    for(var i = 0; i < pJS.particles.array.length; i++){
      var p2 = pJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx*dx + dy*dy);

      if(dist <= p1.radius + p2.radius){
        p1.x = position ? position.x : Math.random() * pJS.canvas.w;
        p1.y = position ? position.y : Math.random() * pJS.canvas.h;
        pJS.fn.vendors.checkOverlap(p1);
      }
    }
  };


  pJS.fn.vendors.createSvgImg = function(p){

    /* set color to svg element */
    var svgXml = pJS.tmp.source_svg,
        rgbHex = /#([0-9A-F]{3,6})/gi,
        coloredSvgXml = svgXml.replace(rgbHex, function (m, r, g, b) {
          if(p.color.rgb){
            var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+p.opacity+')';
          }else{
            var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+p.opacity+')';
          }
          return color_value;
        });

    /* prepare to create img with colored svg */
    var svg = new Blob([coloredSvgXml], {type: 'image/svg+xml;charset=utf-8'}),
        DOMURL = window.URL || window.webkitURL || window,
        url = DOMURL.createObjectURL(svg);

    /* create particle img obj */
    var img = new Image();
    img.addEventListener('load', function(){
      p.img.obj = img;
      p.img.loaded = true;
      DOMURL.revokeObjectURL(url);
      pJS.tmp.count_svg++;
    });
    img.src = url;

  };


  pJS.fn.vendors.destroypJS = function(){
    cancelAnimationFrame(pJS.fn.drawAnimFrame);
    canvas_el.remove();
    pJSDom = null;
  };


  pJS.fn.vendors.drawShape = function(c, startX, startY, sideLength, sideCountNumerator, sideCountDenominator){

    // By Programming Thomas - https://programmingthomas.wordpress.com/2013/04/03/n-sided-shapes/
    var sideCount = sideCountNumerator * sideCountDenominator;
    var decimalSides = sideCountNumerator / sideCountDenominator;
    var interiorAngleDegrees = (180 * (decimalSides - 2)) / decimalSides;
    var interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180; // convert to radians
    c.save();
    c.beginPath();
    c.translate(startX, startY);
    c.moveTo(0,0);
    for (var i = 0; i < sideCount; i++) {
      c.lineTo(sideLength,0);
      c.translate(sideLength,0);
      c.rotate(interiorAngle);
    }
    //c.stroke();
    c.fill();
    c.restore();

  };

  pJS.fn.vendors.exportImg = function(){
    window.open(pJS.canvas.el.toDataURL('image/png'), '_blank');
  };


  pJS.fn.vendors.loadImg = function(type){

    pJS.tmp.img_error = undefined;

    if(pJS.particles.shape.image.src != ''){

      if(type == 'svg'){

        var xhr = new XMLHttpRequest();
        xhr.open('GET', pJS.particles.shape.image.src);
        xhr.onreadystatechange = function (data) {
          if(xhr.readyState == 4){
            if(xhr.status == 200){
              pJS.tmp.source_svg = data.currentTarget.response;
              pJS.fn.vendors.checkBeforeDraw();
            }else{
              console.log('Error pJS - Image not found');
              pJS.tmp.img_error = true;
            }
          }
        }
        xhr.send();

      }else{

        var img = new Image();
        img.addEventListener('load', function(){
          pJS.tmp.img_obj = img;
          pJS.fn.vendors.checkBeforeDraw();
        });
        img.src = pJS.particles.shape.image.src;

      }

    }else{
      console.log('Error pJS - No image.src');
      pJS.tmp.img_error = true;
    }

  };


  pJS.fn.vendors.draw = function(){

    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg'){

        if(pJS.tmp.count_svg >= pJS.particles.number.value){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          //console.log('still loading...');
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }else{

        if(pJS.tmp.img_obj != undefined){
          pJS.fn.particlesDraw();
          if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
          else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }else{
          if(!pJS.tmp.img_error) pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
        }

      }

    }else{
      pJS.fn.particlesDraw();
      if(!pJS.particles.move.enable) cancelRequestAnimFrame(pJS.fn.drawAnimFrame);
      else pJS.fn.drawAnimFrame = requestAnimFrame(pJS.fn.vendors.draw);
    }

  };


  pJS.fn.vendors.checkBeforeDraw = function(){

    // if shape is image
    if(pJS.particles.shape.type == 'image'){

      if(pJS.tmp.img_type == 'svg' && pJS.tmp.source_svg == undefined){
        pJS.tmp.checkAnimFrame = requestAnimFrame(check);
      }else{
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(pJS.tmp.checkAnimFrame);
        if(!pJS.tmp.img_error){
          pJS.fn.vendors.init();
          pJS.fn.vendors.draw();
        }
        
      }

    }else{
      pJS.fn.vendors.init();
      pJS.fn.vendors.draw();
    }

  };


  pJS.fn.vendors.init = function(){

    /* init canvas + particles */
    pJS.fn.retinaInit();
    pJS.fn.canvasInit();
    pJS.fn.canvasSize();
    pJS.fn.canvasPaint();
    pJS.fn.particlesCreate();
    pJS.fn.vendors.densityAutoParticles();

    /* particles.line_linked - convert hex colors to rgb */
    pJS.particles.line_linked.color_rgb_line = hexToRgb(pJS.particles.line_linked.color);

  };


  pJS.fn.vendors.start = function(){

    if(isInArray('image', pJS.particles.shape.type)){
      pJS.tmp.img_type = pJS.particles.shape.image.src.substr(pJS.particles.shape.image.src.length - 3);
      pJS.fn.vendors.loadImg(pJS.tmp.img_type);
    }else{
      pJS.fn.vendors.checkBeforeDraw();
    }

  };




  /* ---------- pJS - start ------------ */


  pJS.fn.vendors.eventsListeners();

  pJS.fn.vendors.start();
  


};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.pJSDom = [];

window.particlesJS = function(tag_id, params){

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* pJS elements */
  var pJS_tag = document.getElementById(tag_id),
      pJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = pJS_tag.getElementsByClassName(pJS_canvas_class);

  /* remove canvas if exists into the pJS target tag */
  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      pJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = pJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    pJSDom.push(new pJS(tag_id, params));
  }

};

window.particlesJS.load = function(tag_id, path_config_json, callback){

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        window.particlesJS(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();

};
/*!
 * sweetalert2 v5.3.5
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Sweetalert2 = factory());
}(this, function () { 'use strict';

  var swalPrefix = 'swal2-'

  var prefix = function (items) {
    var result = {}
    for (var i in items) {
      result[items[i]] = swalPrefix + items[i]
    }
    return result
  }

  var swalClasses = prefix([
    'container',
    'in',
    'iosfix',
    'modal',
    'overlay',
    'fade',
    'show',
    'hide',
    'noanimation',
    'close',
    'content',
    'spacer',
    'confirm',
    'cancel',
    'icon',
    'image',
    'input',
    'file',
    'range',
    'select',
    'radio',
    'checkbox',
    'textarea',
    'inputerror',
    'validationerror',
    'progresssteps',
    'activeprogressstep',
    'progresscircle',
    'progressline',
    'loading',
    'styled'
  ])

  var iconTypes = prefix([
    'success',
    'warning',
    'info',
    'question',
    'error'
  ])

  var defaultParams = {
    title: '',
    text: '',
    html: '',
    type: null,
    customClass: '',
    animation: true,
    allowOutsideClick: true,
    allowEscapeKey: true,
    showConfirmButton: true,
    showCancelButton: false,
    preConfirm: null,
    confirmButtonText: 'OK',
    confirmButtonColor: '#3085d6',
    confirmButtonClass: null,
    cancelButtonText: 'Cancel',
    cancelButtonColor: '#aaa',
    cancelButtonClass: null,
    buttonsStyling: true,
    reverseButtons: false,
    focusCancel: false,
    showCloseButton: false,
    showLoaderOnConfirm: false,
    imageUrl: null,
    imageWidth: null,
    imageHeight: null,
    imageClass: null,
    timer: null,
    width: 500,
    padding: 20,
    background: '#fff',
    input: null,
    inputPlaceholder: '',
    inputValue: '',
    inputOptions: {},
    inputAutoTrim: true,
    inputClass: null,
    inputAttributes: {},
    inputValidator: null,
    progressSteps: [],
    currentProgressStep: null,
    progressStepsDistance: '40px',
    onOpen: null,
    onClose: null
  }

  var sweetHTML = '<div class="' + swalClasses.modal + '" style="display: none" tabIndex="-1">' +
      '<ul class="' + swalClasses.progresssteps + '"></ul>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.error + '">' +
        '<span class="x-mark"><span class="line left"></span><span class="line right"></span></span>' +
      '</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>' +
      '<div class="' + swalClasses.icon + ' ' + iconTypes.success + '">' +
        '<span class="line tip"></span> <span class="line long"></span>' +
        '<div class="placeholder"></div> <div class="fix"></div>' +
      '</div>' +
      '<img class="' + swalClasses.image + '">' +
      '<h2></h2>' +
      '<div class="' + swalClasses.content + '"></div>' +
      '<input class="' + swalClasses.input + '">' +
      '<input type="file" class="' + swalClasses.file + '">' +
      '<div class="' + swalClasses.range + '">' +
        '<output></output>' +
        '<input type="range">' +
      '</div>' +
      '<select class="' + swalClasses.select + '"></select>' +
      '<div class="' + swalClasses.radio + '"></div>' +
      '<label for="' + swalClasses.checkbox + '" class="' + swalClasses.checkbox + '">' +
        '<input type="checkbox">' +
      '</label>' +
      '<textarea class="' + swalClasses.textarea + '"></textarea>' +
      '<div class="' + swalClasses.validationerror + '"></div>' +
      '<hr class="' + swalClasses.spacer + '">' +
      '<button type="button" class="' + swalClasses.confirm + '">OK</button>' +
      '<button type="button" class="' + swalClasses.cancel + '">Cancel</button>' +
      '<span class="' + swalClasses.close + '">&times;</span>' +
    '</div>'

  var sweetContainer

  var existingSweetContainers = document.getElementsByClassName(swalClasses.container)

  if (existingSweetContainers.length) {
    sweetContainer = existingSweetContainers[0]
  } else {
    sweetContainer = document.createElement('div')
    sweetContainer.className = swalClasses.container
    sweetContainer.innerHTML = sweetHTML
  }

  var extend = function (a, b) {
    for (var key in b) {
      if (b.hasOwnProperty(key)) {
        a[key] = b[key]
      }
    }

    return a
  }

  /*
   * Set hover, active and focus-states for buttons (source: http://www.sitepoint.com/javascript-generate-lighter-darker-color)
   */
  var colorLuminance = function (hex, lum) {
    // Validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '')
    if (hex.length < 6) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
    }
    lum = lum || 0

    // Convert to decimal and change luminosity
    var rgb = '#'
    for (var i = 0; i < 3; i++) {
      var c = parseInt(hex.substr(i * 2, 2), 16)
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16)
      rgb += ('00' + c).substr(c.length)
    }

    return rgb
  }

  // Remember state in cases where opening and handling a modal will fiddle with it.
  var states = {
    previousWindowKeyDown: null,
    previousActiveElement: null,
    previousBodyPadding: null
  }

  /*
   * Add modal + overlay to DOM
   */
  var init = function () {
    if (typeof document === 'undefined') {
      console.error('SweetAlert2 requires document to initialize')
      return
    } else if (document.getElementsByClassName(swalClasses.container).length) {
      return
    }

    document.body.appendChild(sweetContainer)

    var modal = getModal()
    var input = getChildByClass(modal, swalClasses.input)
    var file = getChildByClass(modal, swalClasses.file)
    var range = modal.querySelector('.' + swalClasses.range + ' input')
    var select = getChildByClass(modal, swalClasses.select)
    var checkbox = modal.querySelector('.' + swalClasses.checkbox + ' input')
    var textarea = getChildByClass(modal, swalClasses.textarea)

    input.oninput = function () {
      sweetAlert.resetValidationError()
    }

    input.onkeyup = function (event) {
      event.stopPropagation()
      if (event.keyCode === 13) {
        sweetAlert.clickConfirm()
      }
    }

    file.onchange = function () {
      sweetAlert.resetValidationError()
    }

    range.oninput = function () {
      sweetAlert.resetValidationError()
      range.previousSibling.value = range.value
    }

    range.onchange = function () {
      sweetAlert.resetValidationError()
      range.previousSibling.value = range.value
    }

    select.onchange = function () {
      sweetAlert.resetValidationError()
    }

    checkbox.onchange = function () {
      sweetAlert.resetValidationError()
    }

    textarea.oninput = function () {
      sweetAlert.resetValidationError()
    }

    return modal
  }

  /*
   * Manipulate DOM
   */
  var elementByClass = function (className) {
    return sweetContainer.querySelector('.' + className)
  }

  var getModal = function () {
    return document.body.querySelector('.' + swalClasses.modal) || init()
  }

  var getIcons = function () {
    var modal = getModal()
    return modal.querySelectorAll('.' + swalClasses.icon)
  }

  var getSpacer = function () {
    return elementByClass(swalClasses.spacer)
  }

  var getProgressSteps = function () {
    return elementByClass(swalClasses.progresssteps)
  }

  var getValidationError = function () {
    return elementByClass(swalClasses.validationerror)
  }

  var getConfirmButton = function () {
    return elementByClass(swalClasses.confirm)
  }

  var getCancelButton = function () {
    return elementByClass(swalClasses.cancel)
  }

  var getCloseButton = function () {
    return elementByClass(swalClasses.close)
  }

  var getFocusableElements = function (focusCancel) {
    var buttons = [getConfirmButton(), getCancelButton()]
    if (focusCancel) {
      buttons.reverse()
    }
    return buttons.concat(Array.prototype.slice.call(
      getModal().querySelectorAll('button:not([class^=' + swalPrefix + ']), input:not([type=hidden]), textarea, select')
    ))
  }

  var hasClass = function (elem, className) {
    return elem.classList.contains(className)
  }

  var focusInput = function (input) {
    input.focus()

    // place cursor at end of text in text input
    if (input.type !== 'file') {
      // http://stackoverflow.com/a/2345915/1331425
      var val = input.value
      input.value = ''
      input.value = val
    }
  }

  var addClass = function (elem, className) {
    if (!elem || !className) {
      return
    }
    var classes = className.split(/\s+/)
    classes.forEach(function (className) {
      elem.classList.add(className)
    })
  }

  var removeClass = function (elem, className) {
    if (!elem || !className) {
      return
    }
    var classes = className.split(/\s+/)
    classes.forEach(function (className) {
      elem.classList.remove(className)
    })
  }

  var getChildByClass = function (elem, className) {
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (hasClass(elem.childNodes[i], className)) {
        return elem.childNodes[i]
      }
    }
  }

  var show = function (elem, display) {
    if (!display) {
      display = 'block'
    }
    elem.style.opacity = ''
    elem.style.display = display
  }

  var hide = function (elem) {
    elem.style.opacity = ''
    elem.style.display = 'none'
  }

  var empty = function (elem) {
    while (elem.firstChild) {
      elem.removeChild(elem.firstChild)
    }
  }

  // borrowed from jqeury $(elem).is(':visible') implementation
  var isVisible = function (elem) {
    return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length
  }

  var removeStyleProperty = function (elem, property) {
    if (elem.style.removeProperty) {
      elem.style.removeProperty(property)
    } else {
      elem.style.removeAttribute(property)
    }
  }

  var fireClick = function (node) {
    // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
    // Then fixed for today's Chrome browser.
    if (typeof MouseEvent === 'function') {
      // Up-to-date approach
      var mevt = new MouseEvent('click', {
        view: window,
        bubbles: false,
        cancelable: true
      })
      node.dispatchEvent(mevt)
    } else if (document.createEvent) {
      // Fallback
      var evt = document.createEvent('MouseEvents')
      evt.initEvent('click', false, false)
      node.dispatchEvent(evt)
    } else if (document.createEventObject) {
      node.fireEvent('onclick')
    } else if (typeof node.onclick === 'function') {
      node.onclick()
    }
  }

  var stopEventPropagation = function (e) {
    // In particular, make sure the space bar doesn't scroll the main window.
    if (typeof e.stopPropagation === 'function') {
      e.stopPropagation()
      e.preventDefault()
    } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
      window.event.cancelBubble = true
    }
  }

  var animationEndEvent = (function () {
    var testEl = document.createElement('div')
    var transEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd oanimationend',
      'msAnimation': 'MSAnimationEnd',
      'animation': 'animationend'
    }
    for (var i in transEndEventNames) {
      if (transEndEventNames.hasOwnProperty(i) &&
        testEl.style[i] !== undefined) {
        return transEndEventNames[i]
      }
    }

    return false
  })()

  // Reset the page to its previous state
  var resetPrevState = function () {
    var modal = getModal()
    window.onkeydown = states.previousWindowKeyDown
    if (states.previousActiveElement && states.previousActiveElement.focus) {
      states.previousActiveElement.focus()
    }
    clearTimeout(modal.timeout)
  }

  // Measure width of scrollbar
  // https://github.com/twbs/bootstrap/blob/master/js/modal.js#L279-L286
  var measureScrollbar = function () {
    var scrollDiv = document.createElement('div')
    scrollDiv.style.width = '50px'
    scrollDiv.style.height = '50px'
    scrollDiv.style.overflow = 'scroll'
    document.body.appendChild(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    document.body.removeChild(scrollDiv)
    return scrollbarWidth
  }

  // JavaScript Debounce Function
  // https://davidwalsh.name/javascript-debounce-function
  var debounce = function (func, wait, immediate) {
    var timeout
    return function () {
      var context = this
      var args = arguments
      var later = function () {
        timeout = null
        if (!immediate) func.apply(context, args)
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  var modalParams = extend({}, defaultParams)
  var queue = []
  var swal2Observer

  /*
   * Set type, text and actions on modal
   */
  var setParameters = function (params) {
    var modal = getModal()

    for (var param in params) {
      if (!defaultParams.hasOwnProperty(param) && param !== 'extraParams') {
        console.warn('SweetAlert2: Unknown parameter "' + param + '"')
      }
    }

    // set modal width and margin-left
    modal.style.width = (typeof params.width === 'number') ? params.width + 'px' : params.width

    modal.style.padding = params.padding + 'px'
    modal.style.background = params.background

    var $title = modal.querySelector('h2')
    var $content = modal.querySelector('.' + swalClasses.content)
    var $confirmBtn = getConfirmButton()
    var $cancelBtn = getCancelButton()
    var $closeButton = modal.querySelector('.' + swalClasses.close)

    // Title
    $title.innerHTML = params.title.split('\n').join('<br>')

    // Content
    var i
    if (params.text || params.html) {
      if (typeof params.html === 'object') {
        $content.innerHTML = ''
        if (0 in params.html) {
          for (i = 0; i in params.html; i++) {
            $content.appendChild(params.html[i].cloneNode(true))
          }
        } else {
          $content.appendChild(params.html.cloneNode(true))
        }
      } else {
        $content.innerHTML = params.html || (params.text.split('\n').join('<br>'))
      }
      show($content)
    } else {
      hide($content)
    }

    // Close button
    if (params.showCloseButton) {
      show($closeButton)
    } else {
      hide($closeButton)
    }

    // Custom Class
    modal.className = swalClasses.modal
    if (params.customClass) {
      addClass(modal, params.customClass)
    }

    // Progress steps
    var progressStepsContainer = getProgressSteps()
    var currentProgressStep = parseInt(params.currentProgressStep === null ? sweetAlert.getQueueStep() : params.currentProgressStep, 10)
    if (params.progressSteps.length) {
      show(progressStepsContainer)
      empty(progressStepsContainer)
      if (currentProgressStep >= params.progressSteps.length) {
        console.warn(
          'SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length ' +
          '(currentProgressStep like JS arrays starts from 0)'
        )
      }
      params.progressSteps.forEach(function (step, index) {
        var circle = document.createElement('li')
        addClass(circle, swalClasses.progresscircle)
        circle.innerHTML = step
        if (index === currentProgressStep) {
          addClass(circle, swalClasses.activeprogressstep)
        }
        progressStepsContainer.appendChild(circle)
        if (index !== params.progressSteps.length - 1) {
          var line = document.createElement('li')
          addClass(line, swalClasses.progressline)
          line.style.width = params.progressStepsDistance
          progressStepsContainer.appendChild(line)
        }
      })
    } else {
      hide(progressStepsContainer)
    }

    // Icon
    var icons = getIcons()
    for (i = 0; i < icons.length; i++) {
      hide(icons[i])
    }
    if (params.type) {
      var validType = false
      for (var iconType in iconTypes) {
        if (params.type === iconType) {
          validType = true
          break
        }
      }
      if (!validType) {
        console.error('SweetAlert2: Unknown alert type: ' + params.type)
        return false
      }
      var $icon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes[params.type])
      show($icon)

      // Animate icon
      switch (params.type) {
        case 'success':
          addClass($icon, 'animate')
          addClass($icon.querySelector('.tip'), 'animate-success-tip')
          addClass($icon.querySelector('.long'), 'animate-success-long')
          break
        case 'error':
          addClass($icon, 'animate-error-icon')
          addClass($icon.querySelector('.x-mark'), 'animate-x-mark')
          break
        case 'warning':
          addClass($icon, 'pulse-warning')
          break
        default:
          break
      }
    }

    // Custom image
    var $customImage = modal.querySelector('.' + swalClasses.image)
    if (params.imageUrl) {
      $customImage.setAttribute('src', params.imageUrl)
      show($customImage)

      if (params.imageWidth) {
        $customImage.setAttribute('width', params.imageWidth)
      } else {
        $customImage.removeAttribute('width')
      }

      if (params.imageHeight) {
        $customImage.setAttribute('height', params.imageHeight)
      } else {
        $customImage.removeAttribute('height')
      }

      $customImage.className = swalClasses.image
      if (params.imageClass) {
        addClass($customImage, params.imageClass)
      }
    } else {
      hide($customImage)
    }

    // Cancel button
    if (params.showCancelButton) {
      $cancelBtn.style.display = 'inline-block'
    } else {
      hide($cancelBtn)
    }

    // Confirm button
    if (params.showConfirmButton) {
      removeStyleProperty($confirmBtn, 'display')
    } else {
      hide($confirmBtn)
    }

    // Buttons spacer
    var spacer = getSpacer()
    if (!params.showConfirmButton && !params.showCancelButton) {
      hide(spacer)
    } else {
      show(spacer)
    }

    // Edit text on cancel and confirm buttons
    $confirmBtn.innerHTML = params.confirmButtonText
    $cancelBtn.innerHTML = params.cancelButtonText

    // Set buttons to selected background colors
    if (params.buttonsStyling) {
      $confirmBtn.style.backgroundColor = params.confirmButtonColor
      $cancelBtn.style.backgroundColor = params.cancelButtonColor
    }

    // Add buttons custom classes
    $confirmBtn.className = swalClasses.confirm
    addClass($confirmBtn, params.confirmButtonClass)
    $cancelBtn.className = swalClasses.cancel
    addClass($cancelBtn, params.cancelButtonClass)

    // Buttons styling
    if (params.buttonsStyling) {
      addClass($confirmBtn, swalClasses.styled)
      addClass($cancelBtn, swalClasses.styled)
    } else {
      removeClass($confirmBtn, swalClasses.styled)
      removeClass($cancelBtn, swalClasses.styled)

      $confirmBtn.style.backgroundColor = $confirmBtn.style.borderLeftColor = $confirmBtn.style.borderRightColor = ''
      $cancelBtn.style.backgroundColor = $cancelBtn.style.borderLeftColor = $cancelBtn.style.borderRightColor = ''
    }

    // CSS animation
    if (params.animation === true) {
      removeClass(modal, swalClasses.noanimation)
    } else {
      addClass(modal, swalClasses.noanimation)
    }
  }

  /*
   * Animations
   */
  var openModal = function (animation, onComplete) {
    var modal = getModal()
    if (animation) {
      addClass(modal, swalClasses.show)
      addClass(sweetContainer, swalClasses.fade)
      removeClass(modal, swalClasses.hide)
    } else {
      removeClass(modal, swalClasses.fade)
    }
    show(modal)

    // scrolling is 'hidden' until animation is done, after that 'auto'
    sweetContainer.style.overflowY = 'hidden'
    if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
      modal.addEventListener(animationEndEvent, function swalCloseEventFinished () {
        modal.removeEventListener(animationEndEvent, swalCloseEventFinished)
        sweetContainer.style.overflowY = 'auto'
      })
    } else {
      sweetContainer.style.overflowY = 'auto'
    }

    addClass(sweetContainer, swalClasses.in)
    addClass(document.body, swalClasses.in)
    fixScrollbar()
    iOSfix()
    states.previousActiveElement = document.activeElement
    if (onComplete !== null && typeof onComplete === 'function') {
      onComplete.call(this, modal)
    }
  }

  function fixScrollbar () {
    // for queues, do not do this more than once
    if (states.previousBodyPadding !== null) {
      return
    }
    // if the body has overflow
    if (document.body.scrollHeight > window.innerHeight) {
      // add padding so the content doesn't shift after removal of scrollbar
      states.previousBodyPadding = document.body.style.paddingRight
      document.body.style.paddingRight = measureScrollbar() + 'px'
    }
  }

  function undoScrollbar () {
    if (states.previousBodyPadding !== null) {
      document.body.style.paddingRight = states.previousBodyPadding
      states.previousBodyPadding = null
    }
  }

  // Fix iOS scrolling http://stackoverflow.com/q/39626302/1331425
  function iOSfix () {
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
      var offset = document.body.scrollTop
      document.body.style.top = (offset * -1) + 'px'
      addClass(document.body, swalClasses.iosfix)
    }
  }

  function undoIOSfix () {
    if (hasClass(document.body, swalClasses.iosfix)) {
      var offset = parseInt(document.body.style.top, 10)
      removeClass(document.body, swalClasses.iosfix)
      document.body.scrollTop = (offset * -1)
    }
  }

  function modalDependant () {
    if (arguments[0] === undefined) {
      console.error('SweetAlert2 expects at least 1 attribute!')
      return false
    }

    var params = extend({}, modalParams)

    switch (typeof arguments[0]) {

      case 'string':
        params.title = arguments[0]
        params.text = arguments[1] || ''
        params.type = arguments[2] || ''

        break

      case 'object':
        extend(params, arguments[0])
        params.extraParams = arguments[0].extraParams

        if (params.input === 'email' && params.inputValidator === null) {
          params.inputValidator = function (email) {
            return new Promise(function (resolve, reject) {
              var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
              if (emailRegex.test(email)) {
                resolve()
              } else {
                reject('Invalid email address')
              }
            })
          }
        }

        break

      default:
        console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got ' + typeof arguments[0])
        return false
    }

    setParameters(params)

    // Modal interactions
    var modal = getModal()

    return new Promise(function (resolve, reject) {
      // Close on timer
      if (params.timer) {
        modal.timeout = setTimeout(function () {
          sweetAlert.closeModal(params.onClose)
          reject('timer')
        }, params.timer)
      }

      // Get input element by specified type or, if type isn't specified, by params.input
      var getInput = function (inputType) {
        inputType = inputType || params.input
        switch (inputType) {
          case 'select':
          case 'textarea':
          case 'file':
            return getChildByClass(modal, swalClasses[inputType])
          case 'checkbox':
            return modal.querySelector('.' + swalClasses.checkbox + ' input')
          case 'radio':
            return modal.querySelector('.' + swalClasses.radio + ' input:checked') ||
              modal.querySelector('.' + swalClasses.radio + ' input:first-child')
          case 'range':
            return modal.querySelector('.' + swalClasses.range + ' input')
          default:
            return getChildByClass(modal, swalClasses.input)
        }
      }

      // Get the value of the modal input
      var getInputValue = function () {
        var input = getInput()
        if (!input) {
          return null
        }
        switch (params.input) {
          case 'checkbox':
            return input.checked ? 1 : 0
          case 'radio':
            return input.checked ? input.value : null
          case 'file':
            return input.files.length ? input.files[0] : null
          default:
            return params.inputAutoTrim ? input.value.trim() : input.value
        }
      }

      // input autofocus
      if (params.input) {
        setTimeout(function () {
          var input = getInput()
          if (input) {
            focusInput(input)
          }
        }, 0)
      }

      var confirm = function (value) {
        if (params.showLoaderOnConfirm) {
          sweetAlert.showLoading()
        }

        if (params.preConfirm) {
          params.preConfirm(value, params.extraParams).then(
            function (preConfirmValue) {
              sweetAlert.closeModal(params.onClose)
              resolve(preConfirmValue || value)
            },
            function (error) {
              sweetAlert.hideLoading()
              if (error) {
                sweetAlert.showValidationError(error)
              }
            }
          )
        } else {
          sweetAlert.closeModal(params.onClose)
          resolve(value)
        }
      }

      // Mouse interactions
      var onButtonEvent = function (event) {
        var e = event || window.event
        var target = e.target || e.srcElement
        var confirmBtn = getConfirmButton()
        var cancelBtn = getCancelButton()
        var targetedConfirm = confirmBtn === target || confirmBtn.contains(target)
        var targetedCancel = cancelBtn === target || cancelBtn.contains(target)

        switch (e.type) {
          case 'mouseover':
          case 'mouseup':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.1)
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.1)
              }
            }
            break
          case 'mouseout':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = params.confirmButtonColor
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = params.cancelButtonColor
              }
            }
            break
          case 'mousedown':
            if (params.buttonsStyling) {
              if (targetedConfirm) {
                confirmBtn.style.backgroundColor = colorLuminance(params.confirmButtonColor, -0.2)
              } else if (targetedCancel) {
                cancelBtn.style.backgroundColor = colorLuminance(params.cancelButtonColor, -0.2)
              }
            }
            break
          case 'click':
            // Clicked 'confirm'
            if (targetedConfirm && sweetAlert.isVisible()) {
              if (params.input) {
                var inputValue = getInputValue()

                if (params.inputValidator) {
                  sweetAlert.disableInput()
                  params.inputValidator(inputValue, params.extraParams).then(
                    function () {
                      sweetAlert.enableInput()
                      confirm(inputValue)
                    },
                    function (error) {
                      sweetAlert.enableInput()
                      if (error) {
                        sweetAlert.showValidationError(error)
                      }
                    }
                  )
                } else {
                  confirm(inputValue)
                }
              } else {
                confirm(true)
              }

            // Clicked 'cancel'
            } else if (targetedCancel && sweetAlert.isVisible()) {
              sweetAlert.closeModal(params.onClose)
              reject('cancel')
            }

            break
          default:
        }
      }

      var $buttons = modal.querySelectorAll('button')
      var i
      for (i = 0; i < $buttons.length; i++) {
        $buttons[i].onclick = onButtonEvent
        $buttons[i].onmouseover = onButtonEvent
        $buttons[i].onmouseout = onButtonEvent
        $buttons[i].onmousedown = onButtonEvent
      }

      // Closing modal by close button
      getCloseButton().onclick = function () {
        sweetAlert.closeModal(params.onClose)
        reject('close')
      }

      // Closing modal by overlay click
      sweetContainer.onclick = function (e) {
        if (e.target !== sweetContainer) {
          return
        }
        if (params.allowOutsideClick) {
          sweetAlert.closeModal(params.onClose)
          reject('overlay')
        }
      }

      var $confirmButton = getConfirmButton()
      var $cancelButton = getCancelButton()

      // Reverse buttons if neede d
      if (params.reverseButtons) {
        $confirmButton.parentNode.insertBefore($cancelButton, $confirmButton)
      } else {
        $confirmButton.parentNode.insertBefore($confirmButton, $cancelButton)
      }

      // Focus handling
      function setFocus (index, increment) {
        var focusableElements = getFocusableElements(params.focusCancel)
        // search for visible elements and select the next possible match
        for (var i = 0; i < focusableElements.length; i++) {
          index = index + increment

          // rollover to first item
          if (index === focusableElements.length) {
            index = 0

          // go to last item
          } else if (index === -1) {
            index = focusableElements.length - 1
          }

          // determine if element is visible
          var el = focusableElements[index]
          if (isVisible(el)) {
            return el.focus()
          }
        }
      }

      function handleKeyDown (event) {
        var e = event || window.event
        var keyCode = e.keyCode || e.which

        if ([9, 13, 32, 27].indexOf(keyCode) === -1) {
          // Don't do work on keys we don't care about.
          return
        }

        var $targetElement = e.target || e.srcElement

        var focusableElements = getFocusableElements(params.focusCancel)
        var btnIndex = -1 // Find the button - note, this is a nodelist, not an array.
        for (var i = 0; i < focusableElements.length; i++) {
          if ($targetElement === focusableElements[i]) {
            btnIndex = i
            break
          }
        }

        // TAB
        if (keyCode === 9) {
          if (!e.shiftKey) {
            // Cycle to the next button
            setFocus(btnIndex, 1)
          } else {
            // Cycle to the prev button
            setFocus(btnIndex, -1)
          }

          stopEventPropagation(e)
        } else {
          if (keyCode === 13 || keyCode === 32) {
            if (btnIndex === -1) {
              // ENTER/SPACE clicked outside of a button.
              if (params.focusCancel) {
                fireClick($cancelButton, e)
              } else {
                fireClick($confirmButton, e)
              }
            }
          } else if (keyCode === 27 && params.allowEscapeKey === true) {
            sweetAlert.closeModal(params.onClose)
            reject('esc')
          }
        }
      }

      states.previousWindowKeyDown = window.onkeydown
      window.onkeydown = handleKeyDown

      // Loading state
      if (params.buttonsStyling) {
        $confirmButton.style.borderLeftColor = params.confirmButtonColor
        $confirmButton.style.borderRightColor = params.confirmButtonColor
      }

      /**
       * Show spinner instead of Confirm button and disable Cancel button
       */
      sweetAlert.showLoading = sweetAlert.enableLoading = function () {
        show(getSpacer())
        show($confirmButton, 'inline-block')
        addClass($confirmButton, swalClasses.loading)
        addClass(modal, swalClasses.loading)
        $confirmButton.disabled = true
        $cancelButton.disabled = true
      }

      /**
       * Show spinner instead of Confirm button and disable Cancel button
       */
      sweetAlert.hideLoading = sweetAlert.disableLoading = function () {
        if (!params.showConfirmButton) {
          hide($confirmButton)
          if (!params.showCancelButton) {
            hide(getSpacer())
          }
        }
        removeClass($confirmButton, swalClasses.loading)
        removeClass(modal, swalClasses.loading)
        $confirmButton.disabled = false
        $cancelButton.disabled = false
      }

      sweetAlert.enableButtons = function () {
        $confirmButton.disabled = false
        $cancelButton.disabled = false
      }

      sweetAlert.disableButtons = function () {
        $confirmButton.disabled = true
        $cancelButton.disabled = true
      }

      sweetAlert.enableConfirmButton = function () {
        $confirmButton.disabled = false
      }

      sweetAlert.disableConfirmButton = function () {
        $confirmButton.disabled = true
      }

      sweetAlert.enableInput = function () {
        var input = getInput()
        if (!input) {
          return false
        }
        if (input.type === 'radio') {
          var radiosContainer = input.parentNode.parentNode
          var radios = radiosContainer.querySelectorAll('input')
          for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = false
          }
        } else {
          input.disabled = false
        }
      }

      sweetAlert.disableInput = function () {
        var input = getInput()
        if (!input) {
          return false
        }
        if (input && input.type === 'radio') {
          var radiosContainer = input.parentNode.parentNode
          var radios = radiosContainer.querySelectorAll('input')
          for (var i = 0; i < radios.length; i++) {
            radios[i].disabled = true
          }
        } else {
          input.disabled = true
        }
      }

      // Set modal min-height to disable scrolling inside the modal
      sweetAlert.recalculateHeight = debounce(function () {
        var modal = getModal()
        var prevState = modal.style.display
        modal.style.minHeight = ''
        show(modal)
        modal.style.minHeight = (modal.scrollHeight + 1) + 'px'
        modal.style.display = prevState
      }, 50)

      // Show block with validation error
      sweetAlert.showValidationError = function (error) {
        var validationError = getValidationError()
        validationError.innerHTML = error
        show(validationError)

        var input = getInput()
        focusInput(input)
        addClass(input, swalClasses.inputerror)
      }

      // Hide block with validation error
      sweetAlert.resetValidationError = function () {
        var validationError = getValidationError()
        hide(validationError)
        sweetAlert.recalculateHeight()

        var input = getInput()
        if (input) {
          removeClass(input, swalClasses.inputerror)
        }
      }

      sweetAlert.getProgressSteps = function () {
        return params.progressSteps
      }

      sweetAlert.setProgressSteps = function (progressSteps) {
        params.progressSteps = progressSteps
        setParameters(params)
      }

      sweetAlert.showProgressSteps = function () {
        show(getProgressSteps())
      }

      sweetAlert.hideProgressSteps = function () {
        hide(getProgressSteps())
      }

      sweetAlert.enableButtons()
      sweetAlert.hideLoading()
      sweetAlert.resetValidationError()

      // inputs
      var inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea']
      var input
      for (i = 0; i < inputTypes.length; i++) {
        var inputClass = swalClasses[inputTypes[i]]
        var inputContainer = getChildByClass(modal, inputClass)
        input = getInput(inputTypes[i])

        // set attributes
        if (input) {
          for (var j in input.attributes) {
            if (input.attributes.hasOwnProperty(j)) {
              var attrName = input.attributes[j].name
              if (attrName !== 'type' && attrName !== 'value') {
                input.removeAttribute(attrName)
              }
            }
          }
          for (var attr in params.inputAttributes) {
            input.setAttribute(attr, params.inputAttributes[attr])
          }
        }

        // set class
        inputContainer.className = inputClass
        if (params.inputClass) {
          addClass(inputContainer, params.inputClass)
        }

        hide(inputContainer)
      }

      var populateInputOptions
      switch (params.input) {
        case 'text':
        case 'email':
        case 'password':
        case 'number':
        case 'tel':
          input = getChildByClass(modal, swalClasses.input)
          input.value = params.inputValue
          input.placeholder = params.inputPlaceholder
          input.type = params.input
          show(input)
          break
        case 'file':
          input = getChildByClass(modal, swalClasses.file)
          input.placeholder = params.inputPlaceholder
          input.type = params.input
          show(input)
          break
        case 'range':
          var range = getChildByClass(modal, swalClasses.range)
          var rangeInput = range.querySelector('input')
          var rangeOutput = range.querySelector('output')
          rangeInput.value = params.inputValue
          rangeInput.type = params.input
          rangeOutput.value = params.inputValue
          show(range)
          break
        case 'select':
          var select = getChildByClass(modal, swalClasses.select)
          select.innerHTML = ''
          if (params.inputPlaceholder) {
            var placeholder = document.createElement('option')
            placeholder.innerHTML = params.inputPlaceholder
            placeholder.value = ''
            placeholder.disabled = true
            placeholder.selected = true
            select.appendChild(placeholder)
          }
          populateInputOptions = function (inputOptions) {
            for (var optionValue in inputOptions) {
              var option = document.createElement('option')
              option.value = optionValue
              option.innerHTML = inputOptions[optionValue]
              if (params.inputValue === optionValue) {
                option.selected = true
              }
              select.appendChild(option)
            }
            show(select)
            select.focus()
          }
          break
        case 'radio':
          var radio = getChildByClass(modal, swalClasses.radio)
          radio.innerHTML = ''
          populateInputOptions = function (inputOptions) {
            for (var radioValue in inputOptions) {
              var id = 1
              var radioInput = document.createElement('input')
              var radioLabel = document.createElement('label')
              var radioLabelSpan = document.createElement('span')
              radioInput.type = 'radio'
              radioInput.name = swalClasses.radio
              radioInput.value = radioValue
              radioInput.id = swalClasses.radio + '-' + (id++)
              if (params.inputValue === radioValue) {
                radioInput.checked = true
              }
              radioLabelSpan.innerHTML = inputOptions[radioValue]
              radioLabel.appendChild(radioInput)
              radioLabel.appendChild(radioLabelSpan)
              radioLabel.for = radioInput.id
              radio.appendChild(radioLabel)
            }
            show(radio)
            var radios = radio.querySelectorAll('input')
            if (radios.length) {
              radios[0].focus()
            }
          }
          break
        case 'checkbox':
          var checkbox = getChildByClass(modal, swalClasses.checkbox)
          var checkboxInput = getInput('checkbox')
          checkboxInput.type = 'checkbox'
          checkboxInput.value = 1
          checkboxInput.id = swalClasses.checkbox
          checkboxInput.checked = Boolean(params.inputValue)
          var label = checkbox.getElementsByTagName('span')
          if (label.length) {
            checkbox.removeChild(label[0])
          }
          label = document.createElement('span')
          label.innerHTML = params.inputPlaceholder
          checkbox.appendChild(label)
          show(checkbox)
          break
        case 'textarea':
          var textarea = getChildByClass(modal, swalClasses.textarea)
          textarea.value = params.inputValue
          textarea.placeholder = params.inputPlaceholder
          show(textarea)
          break
        case null:
          break
        default:
          console.error('SweetAlert2: Unexpected type of input! Expected "text" or "email" or "password", "select", "checkbox", "textarea" or "file", got "' + params.input + '"')
          break
      }

      if (params.input === 'select' || params.input === 'radio') {
        if (params.inputOptions instanceof Promise) {
          sweetAlert.showLoading()
          params.inputOptions.then(function (inputOptions) {
            sweetAlert.hideLoading()
            populateInputOptions(inputOptions)
          })
        } else if (typeof params.inputOptions === 'object') {
          populateInputOptions(params.inputOptions)
        } else {
          console.error('SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got ' + typeof params.inputOptions)
        }
      }

      openModal(params.animation, params.onOpen)

      // Focus the first element (input or button)
      setFocus(-1, 1)

      // fix scroll
      sweetContainer.scrollTop = 0

      // Observe changes inside the modal and adjust height
      if (typeof MutationObserver !== 'undefined' && !swal2Observer) {
        swal2Observer = new MutationObserver(sweetAlert.recalculateHeight)
        swal2Observer.observe(modal, {childList: true, characterData: true, subtree: true})
      }
    })
  }

  // SweetAlert function
  function sweetAlert () {
    // Copy arguments to the local args variable
    var args = arguments

    if (sweetAlert.isVisible()) {
      sweetAlert.close()
    }

    return modalDependant.apply(this, args)
  }

  /*
   * Global function to determine if swal2 modal is visible
   */
  sweetAlert.isVisible = function () {
    var modal = getModal()
    return isVisible(modal)
  }

  /*
   * Global function for chaining sweetAlert modals
   */
  sweetAlert.queue = function (steps) {
    queue = steps
    var modal = getModal()
    var resetQueue = function () {
      queue = []
      modal.removeAttribute('data-queue-step')
    }
    return new Promise(function (resolve, reject) {
      (function step (i, callback) {
        if (i < queue.length) {
          modal.setAttribute('data-queue-step', i)

          sweetAlert(queue[i]).then(function () {
            step(i + 1, callback)
          }, function (dismiss) {
            resetQueue()
            reject(dismiss)
          })
        } else {
          resetQueue()
          resolve()
        }
      })(0)
    })
  }

  /*
   * Global function for getting the index of current modal in queue
   */
  sweetAlert.getQueueStep = function () {
    return getModal().getAttribute('data-queue-step')
  }

  /*
   * Global function for inserting a modal to the queue
   */
  sweetAlert.insertQueueStep = function (step, index) {
    if (index && index < queue.length) {
      return queue.splice(index, 0, step)
    }
    return queue.push(step)
  }

  /*
   * Global function for deleting a modal from the queue
   */
  sweetAlert.deleteQueueStep = function (index) {
    if (typeof queue[index] !== 'undefined') {
      queue.splice(index, 1)
    }
  }

  /*
   * Global function to close sweetAlert
   */
  sweetAlert.close = sweetAlert.closeModal = function (onComplete) {
    var modal = getModal()
    removeClass(modal, swalClasses.show)
    addClass(modal, swalClasses.hide)

    // Reset icon animations
    var $successIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.success)
    removeClass($successIcon, 'animate')
    removeClass($successIcon.querySelector('.tip'), 'animate-success-tip')
    removeClass($successIcon.querySelector('.long'), 'animate-success-long')

    var $errorIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.error)
    removeClass($errorIcon, 'animate-error-icon')
    removeClass($errorIcon.querySelector('.x-mark'), 'animate-x-mark')

    var $warningIcon = modal.querySelector('.' + swalClasses.icon + '.' + iconTypes.warning)
    removeClass($warningIcon, 'pulse-warning')

    resetPrevState()

    var hideModalAndResetState = function () {
      hide(modal)
      modal.style.minHeight = ''
      removeClass(sweetContainer, swalClasses.in)
      removeClass(document.body, swalClasses.in)
      undoScrollbar()
      undoIOSfix()
    }

    // If animation is supported, animate
    if (animationEndEvent && !hasClass(modal, swalClasses.noanimation)) {
      modal.addEventListener(animationEndEvent, function swalCloseEventFinished () {
        modal.removeEventListener(animationEndEvent, swalCloseEventFinished)
        if (hasClass(modal, swalClasses.hide)) {
          hideModalAndResetState()
        }
      })
    } else {
      // Otherwise, hide immediately
      hideModalAndResetState()
    }
    if (onComplete !== null && typeof onComplete === 'function') {
      onComplete.call(this, modal)
    }
  }

  /*
   * Global function to click 'Confirm' button
   */
  sweetAlert.clickConfirm = function () {
    getConfirmButton().click()
  }

  /*
   * Global function to click 'Cancel' button
   */
  sweetAlert.clickCancel = function () {
    getCancelButton().click()
  }

  /**
   * Set default params for each popup
   * @param {Object} userParams
   */
  sweetAlert.setDefaults = function (userParams) {
    if (!userParams) {
      throw new Error('userParams is required')
    }
    if (typeof userParams !== 'object') {
      throw new Error('userParams has to be a object')
    }

    extend(modalParams, userParams)
  }

  /**
   * Reset default params for each popup
   */
  sweetAlert.resetDefaults = function () {
    modalParams = extend({}, defaultParams)
  }

  sweetAlert.noop = function () { }

  sweetAlert.version = '5.3.5'

  if (typeof Promise === 'function') {
    Promise.prototype.done = Promise.prototype.done || function () { // eslint-disable-line
      return this.catch(function () {
        // Catch promise rejections silently.
        // https://github.com/limonte/sweetalert2/issues/177
      })
    }
  } else {
    console.warn('SweetAlert2: Please inlude Promise polyfill BEFORE including sweetalert2.js if IE10+ support needed.')
  }

  return sweetAlert;

}));
if (window.Sweetalert2) window.sweetAlert = window.swal = window.Sweetalert2;

!function(a,b){"function"==typeof define&&define.amd?define(["chartist"],function(c){return a.returnExportsGlobal=b(c)}):"object"==typeof exports?module.exports=b(require("chartist")):a["Chartist.plugins.zoom"]=b(Chartist)}(this,function(a){return function(a,b,c){"use strict";function d(a){a.attr({style:"display:none"})}function e(a){a.attr({style:"display:block"})}function f(a,b){var c=a.x,d=a.y,e=b.x-c,f=b.y-d;return 0>e&&(e=-e,c=b.x),0>f&&(f=-f,d=b.y),{x:c,y:d,width:e,height:f}}function g(a,b){return h(a.clientX,a.clientY,b)}function h(a,b,c){var d="svg"===c.tagName?c:c.ownerSVGElement,e=d.getScreenCTM(),f=d.createSVGPoint();return f.x=a,f.y=b,f=f.matrixTransform(e.inverse()),f||{x:0,y:0}}function i(a,b){var c=b.bounds.max,d=b.bounds.min;if(b.scale&&"log"===b.scale.type){var e=b.scale.base;return Math.pow(e,a*j(c/d,e)/b.axisLength)*d}return a*b.bounds.range/b.axisLength+d}function j(a,b){return Math.log(a)/Math.log(b)}var k={pointClipOffset:5};c.plugins=c.plugins||{},c.plugins.zoom=function(a){return a=c.extend({},k,a),function(b){function h(a){var b=g(a,v);return b.id=a.identifier,b}function j(a){for(var b=0;b<B.length;b++){var c=B[b].id;if(c===a)return b}return-1}function k(a){for(var b=a.changedTouches,c=0;c<b.length;c++)B.push(h(b[c]));B.length>1&&(u.attr(f(B[0],B[1])),e(u))}function l(a){for(var b=a.changedTouches,c=0;c<b.length;c++){var d=j(b[c].identifier);B.splice(d,1,h(b[c]))}B.length>1&&(u.attr(f(B[0],B[1])),e(u),a.preventDefault())}function m(a){n(a.changedTouches)}function n(a){for(var b=0;b<a.length;b++){var c=j(a[b].identifier);c>=0&&B.splice(c,1)}}function o(a){B.length>1&&s(f(B[0],B[1])),n(a.changedTouches),d(u)}function p(a){if(0===a.button){var b=g(a,v);q(b,y)&&(z=b,u.attr(f(z,z)),e(u),a.preventDefault())}}function q(a,b){return a.x>=b.x1&&a.x<=b.x2&&a.y>=b.y2&&a.y<=b.y1}function r(b){if(0===b.button&&z){var c=f(z,g(b,v));s(c),z=null,d(u)}else a.resetOnRightMouseBtn&&2===b.button&&(C(),b.preventDefault())}function s(a){if(a.width>5&&a.height>5){var c=Math.max(0,a.x-y.x1),d=Math.min(y.width(),c+a.width),e=Math.min(y.height(),y.y1-a.y),f=Math.max(0,e-a.height);b.options.axisX.highLow={low:i(c,w),high:i(d,w)},b.options.axisY.highLow={low:i(f,x),high:i(e,x)},b.update(b.data,b.options),A&&A(b,C)}}function t(a){if(z){var b=g(a,v);q(b,y)&&(u.attr(f(z,b)),a.preventDefault())}}if(b instanceof c.Line){var u,v,w,x,y,z,A=a.onZoom,B=[];b.on("draw",function(a){var b=a.type,c="point"===b?"point-mask":"line-mask";("line"===b||"bar"===b||"area"===b||"point"===b)&&a.element.attr({"clip-path":"url(#"+c+")"})}),b.on("created",function(b){function c(a,b){f.elem("clipPath",{id:a}).elem("rect",{x:y.x1-b,y:y.y2-b,width:g+b+b,height:h+b+b,fill:"white"})}function e(a,b){v.addEventListener(a,b)}w=b.axisX,x=b.axisY,y=b.chartRect,v=b.svg._node,u=b.svg.elem("rect",{x:10,y:10,width:100,height:100},"ct-zoom-rect"),d(u);var f=b.svg.querySelector("defs")||b.svg.elem("defs"),g=y.width(),h=y.height();c("line-mask",0),c("point-mask",a.pointClipOffset),e("mousedown",p),e("mouseup",r),e("mousemove",t),e("touchstart",k),e("touchmove",l),e("touchend",o),e("touchcancel",m)});var C=function(){b.options.axisX.highLow=null,b.options.axisY.highLow=null,b.update(b.data,b.options)}}}}}(window,document,a),a.plugins.zoom});
//# sourceMappingURL=chartist-plugin-zoom.min.js.map
/*!
 * fullPage 2.7.9
 * https://github.com/alvarotrigo/fullPage.js
 * @license MIT licensed
 *
 * Copyright (C) 2015 alvarotrigo.com - A project by Alvaro Trigo
 */
(function(global, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], function($) {
          return factory($, global, global.document, global.Math);
        });
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'), global, global.document, global.Math);
    } else {
        factory(jQuery, global, global.document, global.Math);
    }
})(typeof window !== 'undefined' ? window : this, function($, window, document, Math, undefined) {
    'use strict';

    // keeping central set of classnames and selectors
    var WRAPPER =               'fullpage-wrapper';
    var WRAPPER_SEL =           '.' + WRAPPER;

    // slimscroll
    var SCROLLABLE =            'fp-scrollable';
    var SCROLLABLE_SEL =        '.' + SCROLLABLE;
    var SLIMSCROLL_BAR_SEL =    '.slimScrollBar';
    var SLIMSCROLL_RAIL_SEL =   '.slimScrollRail';

    // util
    var RESPONSIVE =            'fp-responsive';
    var NO_TRANSITION =         'fp-notransition';
    var DESTROYED =             'fp-destroyed';
    var ENABLED =               'fp-enabled';
    var VIEWING_PREFIX =        'fp-viewing';
    var ACTIVE =                'active';
    var ACTIVE_SEL =            '.' + ACTIVE;
    var COMPLETELY =            'fp-completely';
    var COMPLETELY_SEL =        '.' + COMPLETELY;

    // section
    var SECTION_DEFAULT_SEL =   '.section';
    var SECTION =               'fp-section';
    var SECTION_SEL =           '.' + SECTION;
    var SECTION_ACTIVE_SEL =    SECTION_SEL + ACTIVE_SEL;
    var SECTION_FIRST_SEL =     SECTION_SEL + ':first';
    var SECTION_LAST_SEL =      SECTION_SEL + ':last';
    var TABLE_CELL =            'fp-tableCell';
    var TABLE_CELL_SEL =        '.' + TABLE_CELL;
    var AUTO_HEIGHT =           'fp-auto-height';
    var AUTO_HEIGHT_SEL =       '.fp-auto-height';
    var NORMAL_SCROLL =         'fp-normal-scroll';
    var NORMAL_SCROLL_SEL =     '.fp-normal-scroll';

    // section nav
    var SECTION_NAV =           'fp-nav';
    var SECTION_NAV_SEL =       '#' + SECTION_NAV;
    var SECTION_NAV_TOOLTIP =   'fp-tooltip';
    var SECTION_NAV_TOOLTIP_SEL='.'+SECTION_NAV_TOOLTIP;
    var SHOW_ACTIVE_TOOLTIP =   'fp-show-active';

    // slide
    var SLIDE_DEFAULT_SEL =     '.slide';
    var SLIDE =                 'fp-slide';
    var SLIDE_SEL =             '.' + SLIDE;
    var SLIDE_ACTIVE_SEL =      SLIDE_SEL + ACTIVE_SEL;
    var SLIDES_WRAPPER =        'fp-slides';
    var SLIDES_WRAPPER_SEL =    '.' + SLIDES_WRAPPER;
    var SLIDES_CONTAINER =      'fp-slidesContainer';
    var SLIDES_CONTAINER_SEL =  '.' + SLIDES_CONTAINER;
    var TABLE =                 'fp-table';

    // slide nav
    var SLIDES_NAV =            'fp-slidesNav';
    var SLIDES_NAV_SEL =        '.' + SLIDES_NAV;
    var SLIDES_NAV_LINK_SEL =   SLIDES_NAV_SEL + ' a';
    var SLIDES_ARROW =          'fp-controlArrow';
    var SLIDES_ARROW_SEL =      '.' + SLIDES_ARROW;
    var SLIDES_PREV =           'fp-prev';
    var SLIDES_PREV_SEL =       '.' + SLIDES_PREV;
    var SLIDES_ARROW_PREV =     SLIDES_ARROW + ' ' + SLIDES_PREV;
    var SLIDES_ARROW_PREV_SEL = SLIDES_ARROW_SEL + SLIDES_PREV_SEL;
    var SLIDES_NEXT =           'fp-next';
    var SLIDES_NEXT_SEL =       '.' + SLIDES_NEXT;
    var SLIDES_ARROW_NEXT =     SLIDES_ARROW + ' ' + SLIDES_NEXT;
    var SLIDES_ARROW_NEXT_SEL = SLIDES_ARROW_SEL + SLIDES_NEXT_SEL;

    var $window = $(window);
    var $document = $(document);

    var defaultScrollHandler;

    $.fn.fullpage = function(options) {
        //only once my friend!
        if($('html').hasClass(ENABLED)){ displayWarnings(); return };

        // common jQuery objects
        var $htmlBody = $('html, body');
        var $body = $('body');

        var FP = $.fn.fullpage;
        // Create some defaults, extending them with any options that were provided
        options = $.extend({
            //navigation
            menu: false,
            anchors:[],
            lockAnchors: false,
            navigation: false,
            navigationPosition: 'right',
            navigationTooltips: [],
            showActiveTooltip: false,
            slidesNavigation: false,
            slidesNavPosition: 'bottom',
            scrollBar: false,
            hybrid: false,

            //scrolling
            css3: true,
            scrollingSpeed: 700,
            autoScrolling: true,
            fitToSection: true,
            fitToSectionDelay: 1000,
            easing: 'easeInOutCubic',
            easingcss3: 'ease',
            loopBottom: false,
            loopTop: false,
            loopHorizontal: true,
            continuousVertical: false,
            normalScrollElements: null,
            scrollOverflow: false,
            scrollOverflowHandler: defaultScrollHandler,
            touchSensitivity: 5,
            normalScrollElementTouchThreshold: 5,

            //Accessibility
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: true,

            //design
            controlArrows: true,
            controlArrowColor: '#fff',
            verticalCentered: true,
            resize: false,
            sectionsColor : [],
            paddingTop: 0,
            paddingBottom: 0,
            fixedElements: null,
            responsive: 0, //backwards compabitility with responsiveWiddth
            responsiveWidth: 0,
            responsiveHeight: 0,

            //Custom selectors
            sectionSelector: SECTION_DEFAULT_SEL,
            slideSelector: SLIDE_DEFAULT_SEL,


            //events
            afterLoad: null,
            onLeave: null,
            afterRender: null,
            afterResize: null,
            afterReBuild: null,
            afterSlideLoad: null,
            onSlideLeave: null
        }, options);

        displayWarnings();

        //easeInOutCubic animation included in the plugin
        $.extend($.easing,{ easeInOutCubic: function (x, t, b, c, d) {if ((t/=d/2) < 1) return c/2*t*t*t + b;return c/2*((t-=2)*t*t + 2) + b;}});

        /**
        * Sets the autoScroll option.
        * It changes the scroll bar visibility and the history of the site as a result.
        */
        FP.setAutoScrolling = function(value, type){
            setVariableState('autoScrolling', value, type);

            var element = $(SECTION_ACTIVE_SEL);

            if(options.autoScrolling && !options.scrollBar){
                $htmlBody.css({
                    'overflow' : 'hidden',
                    'height' : '100%'
                });

                FP.setRecordHistory(originals.recordHistory, 'internal');

                //for IE touch devices
                container.css({
                    '-ms-touch-action': 'none',
                    'touch-action': 'none'
                });

                if(element.length){
                    //moving the container up
                    silentScroll(element.position().top);
                }

            }else{
                $htmlBody.css({
                    'overflow' : 'visible',
                    'height' : 'initial'
                });

                FP.setRecordHistory(false, 'internal');

                //for IE touch devices
                container.css({
                    '-ms-touch-action': '',
                    'touch-action': ''
                });

                silentScroll(0);

                //scrolling the page to the section with no animation
                if (element.length) {
                    $htmlBody.scrollTop(element.position().top);
                }
            }
        };

        /**
        * Defines wheter to record the history for each hash change in the URL.
        */
        FP.setRecordHistory = function(value, type){
            setVariableState('recordHistory', value, type);
        };

        /**
        * Defines the scrolling speed
        */
        FP.setScrollingSpeed = function(value, type){
            setVariableState('scrollingSpeed', value, type);
        };

        /**
        * Sets fitToSection
        */
        FP.setFitToSection = function(value, type){
            setVariableState('fitToSection', value, type);
        };

        /**
        * Sets lockAnchors
        */
        FP.setLockAnchors = function(value){
            options.lockAnchors = value;
        };

        /**
        * Adds or remove the possiblity of scrolling through sections by using the mouse wheel or the trackpad.
        */
        FP.setMouseWheelScrolling = function (value){
            if(value){
                addMouseWheelHandler();
                addMiddleWheelHandler();
            }else{
                removeMouseWheelHandler();
                removeMiddleWheelHandler();
            }
        };

        /**
        * Adds or remove the possiblity of scrolling through sections by using the mouse wheel/trackpad or touch gestures.
        * Optionally a second parameter can be used to specify the direction for which the action will be applied.
        *
        * @param directions string containing the direction or directions separated by comma.
        */
        FP.setAllowScrolling = function (value, directions){
            if(typeof directions !== 'undefined'){
                directions = directions.replace(/ /g,'').split(',');

                $.each(directions, function (index, direction){
                    setIsScrollAllowed(value, direction, 'm');
                });
            }
            else if(value){
                FP.setMouseWheelScrolling(true);
                addTouchHandler();
            }else{
                FP.setMouseWheelScrolling(false);
                removeTouchHandler();
            }
        };

        /**
        * Adds or remove the possiblity of scrolling through sections by using the keyboard arrow keys
        */
        FP.setKeyboardScrolling = function (value, directions){
            if(typeof directions !== 'undefined'){
                directions = directions.replace(/ /g,'').split(',');

                $.each(directions, function (index, direction){
                    setIsScrollAllowed(value, direction, 'k');
                });
            }else{
                options.keyboardScrolling = value;
            }
        };

        /**
        * Moves the page up one section.
        */
        FP.moveSectionUp = function(){
            var prev = $(SECTION_ACTIVE_SEL).prev(SECTION_SEL);

            //looping to the bottom if there's no more sections above
            if (!prev.length && (options.loopTop || options.continuousVertical)) {
                prev = $(SECTION_SEL).last();
            }

            if (prev.length) {
                scrollPage(prev, null, true);
            }
        };

        /**
        * Moves the page down one section.
        */
        FP.moveSectionDown = function (){
            var next = $(SECTION_ACTIVE_SEL).next(SECTION_SEL);

            //looping to the top if there's no more sections below
            if(!next.length &&
                (options.loopBottom || options.continuousVertical)){
                next = $(SECTION_SEL).first();
            }

            if(next.length){
                scrollPage(next, null, false);
            }
        };

        /**
        * Moves the page to the given section and slide with no animation.
        * Anchors or index positions can be used as params.
        */
        FP.silentMoveTo = function(sectionAnchor, slideAnchor){
            FP.setScrollingSpeed (0, 'internal');
            FP.moveTo(sectionAnchor, slideAnchor)
            FP.setScrollingSpeed (originals.scrollingSpeed, 'internal');
        };

        /**
        * Moves the page to the given section and slide.
        * Anchors or index positions can be used as params.
        */
        FP.moveTo = function (sectionAnchor, slideAnchor){
            var destiny = getSectionByAnchor(sectionAnchor);

            if (typeof slideAnchor !== 'undefined'){
                scrollPageAndSlide(sectionAnchor, slideAnchor);
            }else if(destiny.length > 0){
                scrollPage(destiny);
            }
        };

        /**
        * Slides right the slider of the active section.
        * Optional `section` param.
        */
        FP.moveSlideRight = function(section){
            moveSlide('next', section);
        };

        /**
        * Slides left the slider of the active section.
        * Optional `section` param.
        */
        FP.moveSlideLeft = function(section){
            moveSlide('prev', section);
        };

        /**
         * When resizing is finished, we adjust the slides sizes and positions
         */
        FP.reBuild = function(resizing){
            if(container.hasClass(DESTROYED)){ return; }  //nothing to do if the plugin was destroyed

            isResizing = true;

            var windowsWidth = $window.outerWidth();
            windowsHeight = $window.height();  //updating global var

            //text resizing
            if (options.resize) {
                resizeMe(windowsHeight, windowsWidth);
            }

            $(SECTION_SEL).each(function(){
                var slidesWrap = $(this).find(SLIDES_WRAPPER_SEL);
                var slides = $(this).find(SLIDE_SEL);

                //adjusting the height of the table-cell for IE and Firefox
                if(options.verticalCentered){
                    $(this).find(TABLE_CELL_SEL).css('height', getTableHeight($(this)) + 'px');
                }

                $(this).css('height', windowsHeight + 'px');

                //resizing the scrolling divs
                if(options.scrollOverflow){
                    if(slides.length){
                        slides.each(function(){
                            createSlimScrolling($(this));
                        });
                    }else{
                        createSlimScrolling($(this));
                    }
                }

                //adjusting the position fo the FULL WIDTH slides...
                if (slides.length > 1) {
                    landscapeScroll(slidesWrap, slidesWrap.find(SLIDE_ACTIVE_SEL));
                }
            });

            var activeSection = $(SECTION_ACTIVE_SEL);
            var sectionIndex = activeSection.index(SECTION_SEL);

            //isn't it the first section?
            if(sectionIndex){
                //adjusting the position for the current section
                FP.silentMoveTo(sectionIndex + 1);
            }

            isResizing = false;
            $.isFunction( options.afterResize ) && resizing && options.afterResize.call(container);
            $.isFunction( options.afterReBuild ) && !resizing && options.afterReBuild.call(container);
        };

        /**
        * Turns fullPage.js to normal scrolling mode when the viewport `width` or `height`
        * are smaller than the set limit values.
        */
        FP.setResponsive = function (active){
            var isResponsive = $body.hasClass(RESPONSIVE);

            if(active){
                if(!isResponsive){
                    FP.setAutoScrolling(false, 'internal');
                    FP.setFitToSection(false, 'internal');
                    $(SECTION_NAV_SEL).hide();
                    $body.addClass(RESPONSIVE);
                }
            }
            else if(isResponsive){
                FP.setAutoScrolling(originals.autoScrolling, 'internal');
                FP.setFitToSection(originals.autoScrolling, 'internal');
                $(SECTION_NAV_SEL).show();
                $body.removeClass(RESPONSIVE);
            }
        }

        //flag to avoid very fast sliding for landscape sliders
        var slideMoving = false;

        var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);
        var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
        var container = $(this);
        var windowsHeight = $window.height();
        var isResizing = false;
        var isWindowFocused = true;
        var lastScrolledDestiny;
        var lastScrolledSlide;
        var canScroll = true;
        var scrollings = [];
        var nav;
        var controlPressed;
        var isScrollAllowed = {};
        isScrollAllowed.m = {  'up':true, 'down':true, 'left':true, 'right':true };
        isScrollAllowed.k = $.extend(true,{}, isScrollAllowed.m);
        var originals = $.extend(true, {}, options); //deep copy

        //timeouts
        var resizeId;
        var afterSectionLoadsId;
        var afterSlideLoadsId;
        var scrollId;
        var scrollId2;
        var keydownId;

        if($(this).length){
            init();
            bindEvents();
        }

        function init(){
            //if css3 is not supported, it will use jQuery animations
            if(options.css3){
                options.css3 = support3d();
            }

            options.scrollBar = options.scrollBar || options.hybrid;


            setOptionsFromDOM();

            prepareDom();
            FP.setAllowScrolling(true);

            FP.setAutoScrolling(options.autoScrolling, 'internal');

            //the starting point is a slide?
            var activeSlide = $(SECTION_ACTIVE_SEL).find(SLIDE_ACTIVE_SEL);

            //the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
            if( activeSlide.length &&  ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) !== 0 || ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) === 0 && activeSlide.index() !== 0))){
                silentLandscapeScroll(activeSlide);
            }

            responsive();

            //setting the class for the body element
            setBodyClass();

            $window.on('load', function() {
                scrollToAnchor();
            });
        }

        function bindEvents(){
            $window
                //when scrolling...
                .on('scroll', scrollHandler)

                //detecting any change on the URL to scroll to the given anchor link
                //(a way to detect back history button as we play with the hashes on the URL)
                .on('hashchange', hashChangeHandler)

                //when opening a new tab (ctrl + t), `control` won't be pressed when comming back.
                .blur(blurHandler)

                //when resizing the site, we adjust the heights of the sections, slimScroll...
                .resize(resizeHandler);

            $document
                //Sliding with arrow keys, both, vertical and horizontal
                .keydown(keydownHandler)

                //to prevent scrolling while zooming
                .keyup(keyUpHandler)

                //Scrolls to the section when clicking the navigation bullet
                .on('click touchstart', SECTION_NAV_SEL + ' a', sectionBulletHandler)

                //Scrolls the slider to the given slide destination for the given section
                .on('click touchstart', SLIDES_NAV_LINK_SEL, slideBulletHandler)

                .on('click', SECTION_NAV_TOOLTIP_SEL, tooltipTextHandler);

            //Scrolling horizontally when clicking on the slider controls.
            $(SECTION_SEL).on('click touchstart', SLIDES_ARROW_SEL, slideArrowHandler);

            /**
            * Applying normalScroll elements.
            * Ignoring the scrolls over the specified selectors.
            */
            if(options.normalScrollElements){
                $document.on('mouseenter', options.normalScrollElements, function () {
                    FP.setMouseWheelScrolling(false);
                });

                $document.on('mouseleave', options.normalScrollElements, function(){
                    FP.setMouseWheelScrolling(true);
                });
            }
        }

        /**
        * Setting options from DOM elements if they are not provided.
        */
        function setOptionsFromDOM(){
            //no anchors option? Checking for them in the DOM attributes
            if(!options.anchors.length){
                options.anchors = $(options.sectionSelector + '[data-anchor]').map(function(){
                    return $(this).data('anchor').toString();
                }).get();
            }

            //no tooltipos option? Checking for them in the DOM attributes
            if(!options.navigationTooltips.length){
                options.navigationTooltips = $(options.sectionSelector + '[data-tooltip]').map(function(){
                    return $(this).data('tooltip').toString();
                }).get();
            }
        }

        /**
        * Works over the DOM structure to set it up for the current fullpage optionss.
        */
        function prepareDom(){
            container.css({
                'height': '100%',
                'position': 'relative'
            });

            //adding a class to recognize the container internally in the code
            container.addClass(WRAPPER);
            $('html').addClass(ENABLED);

            //due to https://github.com/alvarotrigo/fullPage.js/issues/1502
            windowsHeight = $window.height();

            container.removeClass(DESTROYED); //in case it was destroyed before initilizing it again

            addInternalSelectors();

             //styling the sections / slides / menu
            $(SECTION_SEL).each(function(index){
                var section = $(this);
                var slides = section.find(SLIDE_SEL);
                var numSlides = slides.length;

                styleSection(section, index);
                styleMenu(section, index);

                // if there's any slide
                if (numSlides > 0) {
                    styleSlides(section, slides, numSlides);
                }else{
                    if(options.verticalCentered){
                        addTableClass(section);
                    }
                }
            });

            //fixed elements need to be moved out of the plugin container due to problems with CSS3.
            if(options.fixedElements && options.css3){
                $(options.fixedElements).appendTo($body);
            }

            //vertical centered of the navigation + active bullet
            if(options.navigation){
                addVerticalNavigation();
            }

            if(options.scrollOverflow){
                if(document.readyState === 'complete'){
                    createSlimScrollingHandler();
                }
                //after DOM and images are loaded
                $window.on('load', createSlimScrollingHandler);
            }else{
                afterRenderActions();
            }
        }

        /**
        * Styles the horizontal slides for a section.
        */
        function styleSlides(section, slides, numSlides){
            var sliderWidth = numSlides * 100;
            var slideWidth = 100 / numSlides;

            slides.wrapAll('<div class="' + SLIDES_CONTAINER + '" />');
            slides.parent().wrap('<div class="' + SLIDES_WRAPPER + '" />');

            section.find(SLIDES_CONTAINER_SEL).css('width', sliderWidth + '%');

            if(numSlides > 1){
                if(options.controlArrows){
                    createSlideArrows(section);
                }

                if(options.slidesNavigation){
                    addSlidesNavigation(section, numSlides);
                }
            }

            slides.each(function(index) {
                $(this).css('width', slideWidth + '%');

                if(options.verticalCentered){
                    addTableClass($(this));
                }
            });

            var startingSlide = section.find(SLIDE_ACTIVE_SEL);

            //if the slide won't be an starting point, the default will be the first one
            //the active section isn't the first one? Is not the first slide of the first section? Then we load that section/slide by default.
            if( startingSlide.length &&  ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) !== 0 || ($(SECTION_ACTIVE_SEL).index(SECTION_SEL) === 0 && startingSlide.index() !== 0))){
                silentLandscapeScroll(startingSlide);
            }else{
                slides.eq(0).addClass(ACTIVE);
            }
        }

        /**
        * Styling vertical sections
        */
        function styleSection(section, index){
            //if no active section is defined, the 1st one will be the default one
            if(!index && $(SECTION_ACTIVE_SEL).length === 0) {
                section.addClass(ACTIVE);
            }

            section.css('height', windowsHeight + 'px');

            if(options.paddingTop){
                section.css('padding-top', options.paddingTop);
            }

            if(options.paddingBottom){
                section.css('padding-bottom', options.paddingBottom);
            }

            if (typeof options.sectionsColor[index] !==  'undefined') {
                section.css('background-color', options.sectionsColor[index]);
            }

            if (typeof options.anchors[index] !== 'undefined') {
                section.attr('data-anchor', options.anchors[index]);
            }
        }

        /**
        * Sets the data-anchor attributes to the menu elements and activates the current one.
        */
        function styleMenu(section, index){
            if (typeof options.anchors[index] !== 'undefined') {
                //activating the menu / nav element on load
                if(section.hasClass(ACTIVE)){
                    activateMenuAndNav(options.anchors[index], index);
                }
            }

            //moving the menu outside the main container if it is inside (avoid problems with fixed positions when using CSS3 tranforms)
            if(options.menu && options.css3 && $(options.menu).closest(WRAPPER_SEL).length){
                $(options.menu).appendTo($body);
            }
        }

        /**
        * Adds internal classes to be able to provide customizable selectors
        * keeping the link with the style sheet.
        */
        function addInternalSelectors(){
            //adding internal class names to void problem with common ones
            $(options.sectionSelector).each(function(){
                $(this).addClass(SECTION);
            });
            $(options.slideSelector).each(function(){
                $(this).addClass(SLIDE);
            });
        }

        /**
        * Creates the control arrows for the given section
        */
        function createSlideArrows(section){
            section.find(SLIDES_WRAPPER_SEL).after('<div class="' + SLIDES_ARROW_PREV + '"></div><div class="' + SLIDES_ARROW_NEXT + '"></div>');

            if(options.controlArrowColor!='#fff'){
                section.find(SLIDES_ARROW_NEXT_SEL).css('border-color', 'transparent transparent transparent '+options.controlArrowColor);
                section.find(SLIDES_ARROW_PREV_SEL).css('border-color', 'transparent '+ options.controlArrowColor + ' transparent transparent');
            }

            if(!options.loopHorizontal){
                section.find(SLIDES_ARROW_PREV_SEL).hide();
            }
        }

        /**
        * Creates a vertical navigation bar.
        */
        function addVerticalNavigation(){
            $body.append('<div id="' + SECTION_NAV + '"><ul></ul></div>');
            var nav = $(SECTION_NAV_SEL);

            nav.addClass(function() {
                return options.showActiveTooltip ? SHOW_ACTIVE_TOOLTIP + ' ' + options.navigationPosition : options.navigationPosition;
            });

            for (var i = 0; i < $(SECTION_SEL).length; i++) {
                var link = '';
                if (options.anchors.length) {
                    link = options.anchors[i];
                }

                var li = '<li><a href="#' + link + '"><span></span></a>';

                // Only add tooltip if needed (defined by user)
                var tooltip = options.navigationTooltips[i];

                if (typeof tooltip !== 'undefined' && tooltip !== '') {
                    li += '<div class="' + SECTION_NAV_TOOLTIP + ' ' + options.navigationPosition + '">' + tooltip + '</div>';
                }

                li += '</li>';

                nav.find('ul').append(li);
            }

            //centering it vertically
            $(SECTION_NAV_SEL).css('margin-top', '-' + ($(SECTION_NAV_SEL).height()/2) + 'px');

            //activating the current active section
            $(SECTION_NAV_SEL).find('li').eq($(SECTION_ACTIVE_SEL).index(SECTION_SEL)).find('a').addClass(ACTIVE);
        }

        /**
        * Creates the slim scroll scrollbar for the sections and slides inside them.
        */
        function createSlimScrollingHandler(){
            $(SECTION_SEL).each(function(){
                var slides = $(this).find(SLIDE_SEL);

                if(slides.length){
                    slides.each(function(){
                        createSlimScrolling($(this));
                    });
                }else{
                    createSlimScrolling($(this));
                }

            });
            afterRenderActions();
        }

        /**
        * Actions and callbacks to fire afterRender
        */
        function afterRenderActions(){
            var section = $(SECTION_ACTIVE_SEL);

            section.addClass(COMPLETELY);

            if(options.scrollOverflowHandler.afterRender){
                options.scrollOverflowHandler.afterRender(section);
            }
            lazyLoad(section);
            playMedia(section);

            $.isFunction( options.afterLoad ) && options.afterLoad.call(section, section.data('anchor'), (section.index(SECTION_SEL) + 1));
            $.isFunction( options.afterRender ) && options.afterRender.call(container);
        }


        var isScrolling = false;
        var lastScroll = 0;

        //when scrolling...
        function scrollHandler(){
            var currentSection;

            if(!options.autoScrolling || options.scrollBar){
                var currentScroll = $window.scrollTop();
                var scrollDirection = getScrollDirection(currentScroll);
                var visibleSectionIndex = 0;
                var screen_mid = currentScroll + ($window.height() / 2.0);

                //taking the section which is showing more content in the viewport
                var sections =  document.querySelectorAll(SECTION_SEL);
                for (var i = 0; i < sections.length; ++i) {
                    var section = sections[i];

                    // Pick the the last section which passes the middle line of the screen.
                    if (section.offsetTop <= screen_mid)
                    {
                        visibleSectionIndex = i;
                    }
                }

                if(isCompletelyInViewPort(scrollDirection)){
                    if(!$(SECTION_ACTIVE_SEL).hasClass(COMPLETELY)){
                        $(SECTION_ACTIVE_SEL).addClass(COMPLETELY).siblings().removeClass(COMPLETELY);
                    }
                }

                //geting the last one, the current one on the screen
                currentSection = $(sections).eq(visibleSectionIndex);

                //setting the visible section as active when manually scrolling
                //executing only once the first time we reach the section
                if(!currentSection.hasClass(ACTIVE)){
                    isScrolling = true;
                    var leavingSection = $(SECTION_ACTIVE_SEL);
                    var leavingSectionIndex = leavingSection.index(SECTION_SEL) + 1;
                    var yMovement = getYmovement(currentSection);
                    var anchorLink  = currentSection.data('anchor');
                    var sectionIndex = currentSection.index(SECTION_SEL) + 1;
                    var activeSlide = currentSection.find(SLIDE_ACTIVE_SEL);

                    if(activeSlide.length){
                        var slideAnchorLink = activeSlide.data('anchor');
                        var slideIndex = activeSlide.index();
                    }

                    if(canScroll){
                        currentSection.addClass(ACTIVE).siblings().removeClass(ACTIVE);

                        $.isFunction( options.onLeave ) && options.onLeave.call( leavingSection, leavingSectionIndex, sectionIndex, yMovement);

                        $.isFunction( options.afterLoad ) && options.afterLoad.call( currentSection, anchorLink, sectionIndex);
                        lazyLoad(currentSection);

                        activateMenuAndNav(anchorLink, sectionIndex - 1);

                        if(options.anchors.length){
                            //needed to enter in hashChange event when using the menu with anchor links
                            lastScrolledDestiny = anchorLink;

                            setState(slideIndex, slideAnchorLink, anchorLink, sectionIndex);
                        }
                    }

                    //small timeout in order to avoid entering in hashChange event when scrolling is not finished yet
                    clearTimeout(scrollId);
                    scrollId = setTimeout(function(){
                        isScrolling = false;
                    }, 100);
                }

                if(options.fitToSection){
                    //for the auto adjust of the viewport to fit a whole section
                    clearTimeout(scrollId2);

                    scrollId2 = setTimeout(function(){
                        //checking fitToSection again in case it was set to false before the timeout delay
                        if(canScroll && options.fitToSection){
                            //allows to scroll to an active section and
                            //if the section is already active, we prevent firing callbacks
                            if($(SECTION_ACTIVE_SEL).is(currentSection)){
                                isResizing = true;
                            }
                            scrollPage($(SECTION_ACTIVE_SEL));

                            isResizing = false;
                        }
                    }, options.fitToSectionDelay);
                }
            }
        }

        /**
        * Determines whether the active section has seen in its whole or not.
        */
        function isCompletelyInViewPort(movement){
            var top = $(SECTION_ACTIVE_SEL).position().top;
            var bottom = top + $window.height();

            if(movement == 'up'){
                return bottom >= ($window.scrollTop() + $window.height());
            }
            return top <= $window.scrollTop();
        }

        /**
        * Gets the directon of the the scrolling fired by the scroll event.
        */
        function getScrollDirection(currentScroll){
            var direction = currentScroll > lastScroll ? 'down' : 'up';

            lastScroll = currentScroll;

            return direction;
        }

        /**
        * Determines the way of scrolling up or down:
        * by 'automatically' scrolling a section or by using the default and normal scrolling.
        */
        function scrolling(type, scrollable){
            if (!isScrollAllowed.m[type]){
                return;
            }
            var check, scrollSection;

            if(type == 'down'){
                check = 'bottom';
                scrollSection = FP.moveSectionDown;
            }else{
                check = 'top';
                scrollSection = FP.moveSectionUp;
            }

            if(scrollable.length > 0 ){
                //is the scrollbar at the start/end of the scroll?
                if(options.scrollOverflowHandler.isScrolled(check, scrollable)){
                    scrollSection();
                }else{
                    return true;
                }
            }else{
                // moved up/down
                scrollSection();
            }
        }


        var touchStartY = 0;
        var touchStartX = 0;
        var touchEndY = 0;
        var touchEndX = 0;

        /* Detecting touch events

        * As we are changing the top property of the page on scrolling, we can not use the traditional way to detect it.
        * This way, the touchstart and the touch moves shows an small difference between them which is the
        * used one to determine the direction.
        */
        function touchMoveHandler(event){
            var e = event.originalEvent;

            // additional: if one of the normalScrollElements isn't within options.normalScrollElementTouchThreshold hops up the DOM chain
            if (!checkParentForNormalScrollElement(event.target) && isReallyTouch(e) ) {

                if(options.autoScrolling){
                    //preventing the easing on iOS devices
                    event.preventDefault();
                }

                var activeSection = $(SECTION_ACTIVE_SEL);
                var scrollable = options.scrollOverflowHandler.scrollable(activeSection);

                if (canScroll && !slideMoving) { //if theres any #
                    var touchEvents = getEventsPage(e);

                    touchEndY = touchEvents.y;
                    touchEndX = touchEvents.x;

                    //if movement in the X axys is greater than in the Y and the currect section has slides...
                    if (activeSection.find(SLIDES_WRAPPER_SEL).length && Math.abs(touchStartX - touchEndX) > (Math.abs(touchStartY - touchEndY))) {

                        //is the movement greater than the minimum resistance to scroll?
                        if (Math.abs(touchStartX - touchEndX) > ($window.outerWidth() / 100 * options.touchSensitivity)) {
                            if (touchStartX > touchEndX) {
                                if(isScrollAllowed.m.right){
                                    FP.moveSlideRight(); //next
                                }
                            } else {
                                if(isScrollAllowed.m.left){
                                    FP.moveSlideLeft(); //prev
                                }
                            }
                        }
                    }

                    //vertical scrolling (only when autoScrolling is enabled)
                    else if(options.autoScrolling){

                        //is the movement greater than the minimum resistance to scroll?
                        if (Math.abs(touchStartY - touchEndY) > ($window.height() / 100 * options.touchSensitivity)) {
                            if (touchStartY > touchEndY) {
                                scrolling('down', scrollable);
                            } else if (touchEndY > touchStartY) {
                                scrolling('up', scrollable);
                            }
                        }
                    }
                }
            }

        }

        /**
         * recursive function to loop up the parent nodes to check if one of them exists in options.normalScrollElements
         * Currently works well for iOS - Android might need some testing
         * @param  {Element} el  target element / jquery selector (in subsequent nodes)
         * @param  {int}     hop current hop compared to options.normalScrollElementTouchThreshold
         * @return {boolean} true if there is a match to options.normalScrollElements
         */
        function checkParentForNormalScrollElement (el, hop) {
            hop = hop || 0;
            var parent = $(el).parent();

            if (hop < options.normalScrollElementTouchThreshold &&
                parent.is(options.normalScrollElements) ) {
                return true;
            } else if (hop == options.normalScrollElementTouchThreshold) {
                return false;
            } else {
                return checkParentForNormalScrollElement(parent, ++hop);
            }
        }

        /**
        * As IE >= 10 fires both touch and mouse events when using a mouse in a touchscreen
        * this way we make sure that is really a touch event what IE is detecting.
        */
        function isReallyTouch(e){
            //if is not IE   ||  IE is detecting `touch` or `pen`
            return typeof e.pointerType === 'undefined' || e.pointerType != 'mouse';
        }

        /**
        * Handler for the touch start event.
        */
        function touchStartHandler(event){
            var e = event.originalEvent;

            //stopping the auto scroll to adjust to a section
            if(options.fitToSection){
                $htmlBody.stop();
            }

            if(isReallyTouch(e)){
                var touchEvents = getEventsPage(e);
                touchStartY = touchEvents.y;
                touchStartX = touchEvents.x;
            }
        }

        /**
        * Gets the average of the last `number` elements of the given array.
        */
        function getAverage(elements, number){
            var sum = 0;

            //taking `number` elements from the end to make the average, if there are not enought, 1
            var lastElements = elements.slice(Math.max(elements.length - number, 1));

            for(var i = 0; i < lastElements.length; i++){
                sum = sum + lastElements[i];
            }

            return Math.ceil(sum/number);
        }

        /**
         * Detecting mousewheel scrolling
         *
         * http://blogs.sitepointstatic.com/examples/tech/mouse-wheel/index.html
         * http://www.sitepoint.com/html5-javascript-mouse-wheel/
         */
        var prevTime = new Date().getTime();

        function MouseWheelHandler(e) {
            var curTime = new Date().getTime();
            var isNormalScroll = $(COMPLETELY_SEL).hasClass(NORMAL_SCROLL);

            //autoscrolling and not zooming?
            if(options.autoScrolling && !controlPressed && !isNormalScroll){
                // cross-browser wheel delta
                e = e || window.event;
                var value = e.wheelDelta || -e.deltaY || -e.detail;
                var delta = Math.max(-1, Math.min(1, value));

                var horizontalDetection = typeof e.wheelDeltaX !== 'undefined' || typeof e.deltaX !== 'undefined';
                var isScrollingVertically = (Math.abs(e.wheelDeltaX) < Math.abs(e.wheelDelta)) || (Math.abs(e.deltaX ) < Math.abs(e.deltaY) || !horizontalDetection);

                //Limiting the array to 150 (lets not waste memory!)
                if(scrollings.length > 149){
                    scrollings.shift();
                }

                //keeping record of the previous scrollings
                scrollings.push(Math.abs(value));

                //preventing to scroll the site on mouse wheel when scrollbar is present
                if(options.scrollBar){
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;
                }

                var activeSection = $(SECTION_ACTIVE_SEL);
                var scrollable = options.scrollOverflowHandler.scrollable(activeSection);

                //time difference between the last scroll and the current one
                var timeDiff = curTime-prevTime;
                prevTime = curTime;

                //haven't they scrolled in a while?
                //(enough to be consider a different scrolling action to scroll another section)
                if(timeDiff > 200){
                    //emptying the array, we dont care about old scrollings for our averages
                    scrollings = [];
                }

                if(canScroll){
                    var averageEnd = getAverage(scrollings, 10);
                    var averageMiddle = getAverage(scrollings, 70);
                    var isAccelerating = averageEnd >= averageMiddle;

                    //to avoid double swipes...
                    if(isAccelerating && isScrollingVertically){
                        //scrolling down?
                        if (delta < 0) {
                            scrolling('down', scrollable);

                        //scrolling up?
                        }else {
                            scrolling('up', scrollable);
                        }
                    }
                }

                return false;
            }

            if(options.fitToSection){
                //stopping the auto scroll to adjust to a section
                $htmlBody.stop();
            }
        }

        /**
        * Slides a slider to the given direction.
        * Optional `section` param.
        */
        function moveSlide(direction, section){
            var activeSection = typeof section === 'undefined' ? $(SECTION_ACTIVE_SEL) : section;
            var slides = activeSection.find(SLIDES_WRAPPER_SEL);
            var numSlides = slides.find(SLIDE_SEL).length;

            // more than one slide needed and nothing should be sliding
            if (!slides.length || slideMoving || numSlides < 2) {
                return;
            }

            var currentSlide = slides.find(SLIDE_ACTIVE_SEL);
            var destiny = null;

            if(direction === 'prev'){
                destiny = currentSlide.prev(SLIDE_SEL);
            }else{
                destiny = currentSlide.next(SLIDE_SEL);
            }

            //isn't there a next slide in the secuence?
            if(!destiny.length){
                //respect loopHorizontal settin
                if (!options.loopHorizontal) return;

                if(direction === 'prev'){
                    destiny = currentSlide.siblings(':last');
                }else{
                    destiny = currentSlide.siblings(':first');
                }
            }

            slideMoving = true;

            landscapeScroll(slides, destiny);
        }

        /**
        * Maintains the active slides in the viewport
        * (Because he `scroll` animation might get lost with some actions, such as when using continuousVertical)
        */
        function keepSlidesPosition(){
            $(SLIDE_ACTIVE_SEL).each(function(){
                silentLandscapeScroll($(this), 'internal');
            });
        }

        var previousDestTop = 0;
        /**
        * Returns the destination Y position based on the scrolling direction and
        * the height of the section.
        */
        function getDestinationPosition(element){
            var elemPosition = element.position();

            //top of the desination will be at the top of the viewport
            var position = elemPosition.top;
            var isScrollingDown =  elemPosition.top > previousDestTop;
            var sectionBottom = position - windowsHeight + element.outerHeight();

            //is the destination element bigger than the viewport?
            if(element.outerHeight() > windowsHeight){
                //scrolling up?
                if(!isScrollingDown){
                    position = sectionBottom;
                }
            }

            //sections equal or smaller than the viewport height && scrolling down? ||  is resizing and its in the last section
            else if(isScrollingDown || (isResizing && element.is(':last-child')) ){
                //The bottom of the destination will be at the bottom of the viewport
                position = sectionBottom;
            }

            /*
            Keeping record of the last scrolled position to determine the scrolling direction.
            No conventional methods can be used as the scroll bar might not be present
            AND the section might not be active if it is auto-height and didnt reach the middle
            of the viewport.
            */
            previousDestTop = position;
            return position;
        }

        /**
        * Scrolls the site to the given element and scrolls to the slide if a callback is given.
        */
        function scrollPage(element, callback, isMovementUp){
            if(typeof element === 'undefined'){ return; } //there's no element to scroll, leaving the function

            var dtop = getDestinationPosition(element);

            //local variables
            var v = {
                element: element,
                callback: callback,
                isMovementUp: isMovementUp,
                dtop: dtop,
                yMovement: getYmovement(element),
                anchorLink: element.data('anchor'),
                sectionIndex: element.index(SECTION_SEL),
                activeSlide: element.find(SLIDE_ACTIVE_SEL),
                activeSection: $(SECTION_ACTIVE_SEL),
                leavingSection: $(SECTION_ACTIVE_SEL).index(SECTION_SEL) + 1,

                //caching the value of isResizing at the momment the function is called
                //because it will be checked later inside a setTimeout and the value might change
                localIsResizing: isResizing
            };

            //quiting when destination scroll is the same as the current one
            if((v.activeSection.is(element) && !isResizing) || (options.scrollBar && $window.scrollTop() === v.dtop && !element.hasClass(AUTO_HEIGHT) )){ return; }

            if(v.activeSlide.length){
                var slideAnchorLink = v.activeSlide.data('anchor');
                var slideIndex = v.activeSlide.index();
            }

            // If continuousVertical && we need to wrap around
            if (options.autoScrolling && options.continuousVertical && typeof (v.isMovementUp) !== "undefined" &&
                ((!v.isMovementUp && v.yMovement == 'up') || // Intending to scroll down but about to go up or
                (v.isMovementUp && v.yMovement == 'down'))) { // intending to scroll up but about to go down

                v = createInfiniteSections(v);
            }

            //callback (onLeave) if the site is not just resizing and readjusting the slides
            if($.isFunction(options.onLeave) && !v.localIsResizing){
                if(options.onLeave.call(v.activeSection, v.leavingSection, (v.sectionIndex + 1), v.yMovement) === false){
                    return;
                }
            }
            stopMedia(v.activeSection);

            element.addClass(ACTIVE).siblings().removeClass(ACTIVE);
            lazyLoad(element);

            //preventing from activating the MouseWheelHandler event
            //more than once if the page is scrolling
            canScroll = false;

            setState(slideIndex, slideAnchorLink, v.anchorLink, v.sectionIndex);

            performMovement(v);

            //flag to avoid callingn `scrollPage()` twice in case of using anchor links
            lastScrolledDestiny = v.anchorLink;

            //avoid firing it twice (as it does also on scroll)
            activateMenuAndNav(v.anchorLink, v.sectionIndex);
        }

        /**
        * Performs the movement (by CSS3 or by jQuery)
        */
        function performMovement(v){
            // using CSS3 translate functionality
            if (options.css3 && options.autoScrolling && !options.scrollBar) {
                var translate3d = 'translate3d(0px, -' + v.dtop + 'px, 0px)';
                transformContainer(translate3d, true);

                //even when the scrollingSpeed is 0 there's a little delay, which might cause the
                //scrollingSpeed to change in case of using silentMoveTo();
                if(options.scrollingSpeed){
                    afterSectionLoadsId = setTimeout(function () {
                        afterSectionLoads(v);
                    }, options.scrollingSpeed);
                }else{
                    afterSectionLoads(v);
                }
            }

            // using jQuery animate
            else{
                var scrollSettings = getScrollSettings(v);

                $(scrollSettings.element).animate(
                    scrollSettings.options,
                options.scrollingSpeed, options.easing).promise().done(function () { //only one single callback in case of animating  `html, body`
                    if(options.scrollBar){

                        /* Hack!
                        The timeout prevents setting the most dominant section in the viewport as "active" when the user
                        scrolled to a smaller section by using the mousewheel (auto scrolling) rather than draging the scroll bar.

                        When using scrollBar:true It seems like the scroll events still getting propagated even after the scrolling animation has finished.
                        */
                        setTimeout(function(){
                            afterSectionLoads(v);
                        },30);
                    }else{
                        afterSectionLoads(v);
                    }
                });
            }
        }

        /**
        * Gets the scrolling settings depending on the plugin autoScrolling option
        */
        function getScrollSettings(v){
            var scroll = {};

            if(options.autoScrolling && !options.scrollBar){
                scroll.options = { 'top': -v.dtop};
                scroll.element = WRAPPER_SEL;
            }else{
                scroll.options = { 'scrollTop': v.dtop};
                scroll.element = 'html, body';
            }

            return scroll;
        }

        /**
        * Adds sections before or after the current one to create the infinite effect.
        */
        function createInfiniteSections(v){
            // Scrolling down
            if (!v.isMovementUp) {
                // Move all previous sections to after the active section
                $(SECTION_ACTIVE_SEL).after(v.activeSection.prevAll(SECTION_SEL).get().reverse());
            }
            else { // Scrolling up
                // Move all next sections to before the active section
                $(SECTION_ACTIVE_SEL).before(v.activeSection.nextAll(SECTION_SEL));
            }

            // Maintain the displayed position (now that we changed the element order)
            silentScroll($(SECTION_ACTIVE_SEL).position().top);

            // Maintain the active slides visible in the viewport
            keepSlidesPosition();

            // save for later the elements that still need to be reordered
            v.wrapAroundElements = v.activeSection;

            // Recalculate animation variables
            v.dtop = v.element.position().top;
            v.yMovement = getYmovement(v.element);

            return v;
        }

        /**
        * Fix section order after continuousVertical changes have been animated
        */
        function continuousVerticalFixSectionOrder (v) {
            // If continuousVertical is in effect (and autoScrolling would also be in effect then),
            // finish moving the elements around so the direct navigation will function more simply
            if (!v.wrapAroundElements || !v.wrapAroundElements.length) {
                return;
            }

            if (v.isMovementUp) {
                $(SECTION_FIRST_SEL).before(v.wrapAroundElements);
            }
            else {
                $(SECTION_LAST_SEL).after(v.wrapAroundElements);
            }

            silentScroll($(SECTION_ACTIVE_SEL).position().top);

            // Maintain the active slides visible in the viewport
            keepSlidesPosition();
        }


        /**
        * Actions to do once the section is loaded.
        */
        function afterSectionLoads (v){
            continuousVerticalFixSectionOrder(v);

            v.element.find('.fp-scrollable').mouseover();

            //callback (afterLoad) if the site is not just resizing and readjusting the slides
            $.isFunction(options.afterLoad) && !v.localIsResizing && options.afterLoad.call(v.element, v.anchorLink, (v.sectionIndex + 1));

            playMedia(v.element);
            v.element.addClass(COMPLETELY).siblings().removeClass(COMPLETELY);

            canScroll = true;

            $.isFunction(v.callback) && v.callback.call(this);
        }

        /**
        * Lazy loads image, video and audio elements.
        */
        function lazyLoad(destiny){
            var destiny = getSlideOrSection(destiny);

            destiny.find('img[data-src], source[data-src], audio[data-src]').each(function(){
                $(this).attr('src', $(this).data('src'));
                $(this).removeAttr('data-src');

                if($(this).is('source')){
                    $(this).closest('video').get(0).load();
                }
            });
        }

        /**
        * Plays video and audio elements.
        */
        function playMedia(destiny){
            var destiny = getSlideOrSection(destiny);

            //playing HTML5 media elements
            destiny.find('video, audio').each(function(){
                var element = $(this).get(0);

                if( element.hasAttribute('autoplay') && typeof element.play === 'function' ) {
                    element.play();
                }
            });
        }

        /**
        * Stops video and audio elements.
        */
        function stopMedia(destiny){
            var destiny = getSlideOrSection(destiny);

            //stopping HTML5 media elements
            destiny.find('video, audio').each(function(){
                var element = $(this).get(0);

                if( !element.hasAttribute('data-ignore') && typeof element.pause === 'function' ) {
                    element.pause();
                }
            });
        }

        /**
        * Gets the active slide (or section) for the given section
        */
        function getSlideOrSection(destiny){
            var slide = destiny.find(SLIDE_ACTIVE_SEL);
            if( slide.length ) {
                destiny = $(slide);
            }

            return destiny;
        }

        /**
        * Scrolls to the anchor in the URL when loading the site
        */
        function scrollToAnchor(){
            //getting the anchor link in the URL and deleting the `#`
            var value =  window.location.hash.replace('#', '').split('/');
            var section = value[0];
            var slide = value[1];

            if(section){  //if theres any #
                if(options.animateAnchor){
                    scrollPageAndSlide(section, slide);
                }else{
                    FP.silentMoveTo(section, slide);
                }
            }
        }

        /**
        * Detecting any change on the URL to scroll to the given anchor link
        * (a way to detect back history button as we play with the hashes on the URL)
        */
        function hashChangeHandler(){
            if(!isScrolling && !options.lockAnchors){
                var value =  window.location.hash.replace('#', '').split('/');
                var section = value[0];
                var slide = value[1];

                    //when moving to a slide in the first section for the first time (first time to add an anchor to the URL)
                    var isFirstSlideMove =  (typeof lastScrolledDestiny === 'undefined');
                    var isFirstScrollMove = (typeof lastScrolledDestiny === 'undefined' && typeof slide === 'undefined' && !slideMoving);


                if(section.length){
                    /*in order to call scrollpage() only once for each destination at a time
                    It is called twice for each scroll otherwise, as in case of using anchorlinks `hashChange`
                    event is fired on every scroll too.*/
                    if ((section && section !== lastScrolledDestiny) && !isFirstSlideMove || isFirstScrollMove || (!slideMoving && lastScrolledSlide != slide ))  {
                        scrollPageAndSlide(section, slide);
                    }
                }
            }
        }

        //Sliding with arrow keys, both, vertical and horizontal
        function keydownHandler(e) {

            clearTimeout(keydownId);

            var activeElement = $(':focus');

            if(!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select') &&
                activeElement.attr('contentEditable') !== "true" && activeElement.attr('contentEditable') !== '' &&
                options.keyboardScrolling && options.autoScrolling){
                var keyCode = e.which;

                //preventing the scroll with arrow keys & spacebar & Page Up & Down keys
                var keyControls = [40, 38, 32, 33, 34];
                if($.inArray(keyCode, keyControls) > -1){
                    e.preventDefault();
                }

                controlPressed = e.ctrlKey;

                keydownId = setTimeout(function(){
                    onkeydown(e);
                },150);
            }
        }

        function tooltipTextHandler(){
            $(this).prev().trigger('click');
        }

        //to prevent scrolling while zooming
        function keyUpHandler(e){
            if(isWindowFocused){ //the keyup gets fired on new tab ctrl + t in Firefox
                controlPressed = e.ctrlKey;
            }
        }

        //binding the mousemove when the mouse's middle button is released
        function mouseDownHandler(e){
            //middle button
            if (e.which == 2){
                oldPageY = e.pageY;
                container.on('mousemove', mouseMoveHandler);
            }
        }

        //unbinding the mousemove when the mouse's middle button is released
        function mouseUpHandler(e){
            //middle button
            if (e.which == 2){
                container.off('mousemove');
            }
        }

        //Scrolling horizontally when clicking on the slider controls.
        function slideArrowHandler(){
            var section = $(this).closest(SECTION_SEL);

            if ($(this).hasClass(SLIDES_PREV)) {
                if(isScrollAllowed.m.left){
                    FP.moveSlideLeft(section);
                }
            } else {
                if(isScrollAllowed.m.right){
                    FP.moveSlideRight(section);
                }
            }
        }

        //when opening a new tab (ctrl + t), `control` won't be pressed when comming back.
        function blurHandler(){
            isWindowFocused = false;
            controlPressed = false;
        }

        //Scrolls to the section when clicking the navigation bullet
        function sectionBulletHandler(e){
            e.preventDefault();
            var index = $(this).parent().index();
            scrollPage($(SECTION_SEL).eq(index));
        }

        //Scrolls the slider to the given slide destination for the given section
        function slideBulletHandler(e){
            e.preventDefault();
            var slides = $(this).closest(SECTION_SEL).find(SLIDES_WRAPPER_SEL);
            var destiny = slides.find(SLIDE_SEL).eq($(this).closest('li').index());

            landscapeScroll(slides, destiny);
        }

        /**
        * Keydown event
        */
        function onkeydown(e){
            var shiftPressed = e.shiftKey;

            switch (e.which) {
                //up
                case 38:
                case 33:
                    if(isScrollAllowed.k.up){
                        FP.moveSectionUp();
                    }
                    break;

                //down
                case 32: //spacebar
                    if(shiftPressed && isScrollAllowed.k.up){
                        FP.moveSectionUp();
                        break;
                    }
                case 40:
                case 34:
                    if(isScrollAllowed.k.down){
                        FP.moveSectionDown();
                    }
                    break;

                //Home
                case 36:
                    if(isScrollAllowed.k.up){
                        FP.moveTo(1);
                    }
                    break;

                //End
                case 35:
                     if(isScrollAllowed.k.down){
                        FP.moveTo( $(SECTION_SEL).length );
                    }
                    break;

                //left
                case 37:
                    if(isScrollAllowed.k.left){
                        FP.moveSlideLeft();
                    }
                    break;

                //right
                case 39:
                    if(isScrollAllowed.k.right){
                        FP.moveSlideRight();
                    }
                    break;

                default:
                    return; // exit this handler for other keys
            }
        }

        /**
        * Detecting the direction of the mouse movement.
        * Used only for the middle button of the mouse.
        */
        var oldPageY = 0;
        function mouseMoveHandler(e){
            if(canScroll){
                // moving up
                if (e.pageY < oldPageY && isScrollAllowed.m.up){
                    FP.moveSectionUp();
                }

                // moving down
                else if(e.pageY > oldPageY && isScrollAllowed.m.down){
                    FP.moveSectionDown();
                }
            }
            oldPageY = e.pageY;
        }

        /**
        * Scrolls horizontal sliders.
        */
        function landscapeScroll(slides, destiny){
            var destinyPos = destiny.position();
            var slideIndex = destiny.index();
            var section = slides.closest(SECTION_SEL);
            var sectionIndex = section.index(SECTION_SEL);
            var anchorLink = section.data('anchor');
            var slidesNav = section.find(SLIDES_NAV_SEL);
            var slideAnchor = getAnchor(destiny);
            var prevSlide = section.find(SLIDE_ACTIVE_SEL);

            //caching the value of isResizing at the momment the function is called
            //because it will be checked later inside a setTimeout and the value might change
            var localIsResizing = isResizing;

            if(options.onSlideLeave){
                var prevSlideIndex = prevSlide.index();
                var xMovement = getXmovement(prevSlideIndex, slideIndex);

                //if the site is not just resizing and readjusting the slides
                if(!localIsResizing && xMovement!=='none'){
                    if($.isFunction( options.onSlideLeave )){
                        if(options.onSlideLeave.call( prevSlide, anchorLink, (sectionIndex + 1), prevSlideIndex, xMovement, slideIndex ) === false){
                            slideMoving = false;
                            return;
                        }
                    }
                }
            }
            stopMedia(prevSlide);

            destiny.addClass(ACTIVE).siblings().removeClass(ACTIVE);
            if(!localIsResizing){
                lazyLoad(destiny);
            }

            if(!options.loopHorizontal && options.controlArrows){
                //hidding it for the fist slide, showing for the rest
                section.find(SLIDES_ARROW_PREV_SEL).toggle(slideIndex!==0);

                //hidding it for the last slide, showing for the rest
                section.find(SLIDES_ARROW_NEXT_SEL).toggle(!destiny.is(':last-child'));
            }

            //only changing the URL if the slides are in the current section (not for resize re-adjusting)
            if(section.hasClass(ACTIVE)){
                setState(slideIndex, slideAnchor, anchorLink, sectionIndex);
            }

            var afterSlideLoads = function(){
                //if the site is not just resizing and readjusting the slides
                if(!localIsResizing){
                    $.isFunction( options.afterSlideLoad ) && options.afterSlideLoad.call( destiny, anchorLink, (sectionIndex + 1), slideAnchor, slideIndex);
                }
                playMedia(destiny);

                //letting them slide again
                slideMoving = false;
            };

            if(options.css3){
                var translate3d = 'translate3d(-' + Math.round(destinyPos.left) + 'px, 0px, 0px)';

                addAnimation(slides.find(SLIDES_CONTAINER_SEL), options.scrollingSpeed>0).css(getTransforms(translate3d));

                afterSlideLoadsId = setTimeout(function(){
                    afterSlideLoads();
                }, options.scrollingSpeed, options.easing);
            }else{
                slides.animate({
                    scrollLeft : Math.round(destinyPos.left)
                }, options.scrollingSpeed, options.easing, function() {

                    afterSlideLoads();
                });
            }

            slidesNav.find(ACTIVE_SEL).removeClass(ACTIVE);
            slidesNav.find('li').eq(slideIndex).find('a').addClass(ACTIVE);
        }

        var previousHeight = windowsHeight;

        //when resizing the site, we adjust the heights of the sections, slimScroll...
        function resizeHandler(){
            //checking if it needs to get responsive
            responsive();

            // rebuild immediately on touch devices
            if (isTouchDevice) {
                var activeElement = $(document.activeElement);

                //if the keyboard is NOT visible
                if (!activeElement.is('textarea') && !activeElement.is('input') && !activeElement.is('select')) {
                    var currentHeight = $window.height();

                    //making sure the change in the viewport size is enough to force a rebuild. (20 % of the window to avoid problems when hidding scroll bars)
                    if( Math.abs(currentHeight - previousHeight) > (20 * Math.max(previousHeight, currentHeight) / 100) ){
                        FP.reBuild(true);
                        previousHeight = currentHeight;
                    }
                }
            }else{
                //in order to call the functions only when the resize is finished
                //http://stackoverflow.com/questions/4298612/jquery-how-to-call-resize-event-only-once-its-finished-resizing
                clearTimeout(resizeId);

                resizeId = setTimeout(function(){
                    FP.reBuild(true);
                }, 350);
            }
        }

        /**
        * Checks if the site needs to get responsive and disables autoScrolling if so.
        * A class `fp-responsive` is added to the plugin's container in case the user wants to use it for his own responsive CSS.
        */
        function responsive(){
            var widthLimit = options.responsive || options.responsiveWidth; //backwards compatiblity
            var heightLimit = options.responsiveHeight;

            //only calculating what we need. Remember its called on the resize event.
            var isBreakingPointWidth = widthLimit && $window.outerWidth() < widthLimit;
            var isBreakingPointHeight = heightLimit && $window.height() < heightLimit;

            if(widthLimit && heightLimit){
                FP.setResponsive(isBreakingPointWidth || isBreakingPointHeight);
            }
            else if(widthLimit){
                FP.setResponsive(isBreakingPointWidth);
            }
            else if(heightLimit){
                FP.setResponsive(isBreakingPointHeight);
            }
        }

        /**
        * Adds transition animations for the given element
        */
        function addAnimation(element){
            var transition = 'all ' + options.scrollingSpeed + 'ms ' + options.easingcss3;

            element.removeClass(NO_TRANSITION);
            return element.css({
                '-webkit-transition': transition,
                'transition': transition
            });
        }

        /**
        * Remove transition animations for the given element
        */
        function removeAnimation(element){
            return element.addClass(NO_TRANSITION);
        }

        /**
         * Resizing of the font size depending on the window size as well as some of the images on the site.
         */
        function resizeMe(displayHeight, displayWidth) {
            //Standard dimensions, for which the body font size is correct
            var preferredHeight = 825;
            var preferredWidth = 900;

            if (displayHeight < preferredHeight || displayWidth < preferredWidth) {
                var heightPercentage = (displayHeight * 100) / preferredHeight;
                var widthPercentage = (displayWidth * 100) / preferredWidth;
                var percentage = Math.min(heightPercentage, widthPercentage);
                var newFontSize = percentage.toFixed(2);

                $body.css('font-size', newFontSize + '%');
            } else {
                $body.css('font-size', '100%');
            }
        }

        /**
         * Activating the website navigation dots according to the given slide name.
         */
        function activateNavDots(name, sectionIndex){
            if(options.navigation){
                $(SECTION_NAV_SEL).find(ACTIVE_SEL).removeClass(ACTIVE);
                if(name){
                    $(SECTION_NAV_SEL).find('a[href="#' + name + '"]').addClass(ACTIVE);
                }else{
                    $(SECTION_NAV_SEL).find('li').eq(sectionIndex).find('a').addClass(ACTIVE);
                }
            }
        }

        /**
         * Activating the website main menu elements according to the given slide name.
         */
        function activateMenuElement(name){
            if(options.menu){
                $(options.menu).find(ACTIVE_SEL).removeClass(ACTIVE);
                $(options.menu).find('[data-menuanchor="'+name+'"]').addClass(ACTIVE);
            }
        }

        /**
        * Sets to active the current menu and vertical nav items.
        */
        function activateMenuAndNav(anchor, index){
            activateMenuElement(anchor);
            activateNavDots(anchor, index);
        }

        /**
        * Retuns `up` or `down` depending on the scrolling movement to reach its destination
        * from the current section.
        */
        function getYmovement(destiny){
            var fromIndex = $(SECTION_ACTIVE_SEL).index(SECTION_SEL);
            var toIndex = destiny.index(SECTION_SEL);
            if( fromIndex == toIndex){
                return 'none';
            }
            if(fromIndex > toIndex){
                return 'up';
            }
            return 'down';
        }

        /**
        * Retuns `right` or `left` depending on the scrolling movement to reach its destination
        * from the current slide.
        */
        function getXmovement(fromIndex, toIndex){
            if( fromIndex == toIndex){
                return 'none';
            }
            if(fromIndex > toIndex){
                return 'left';
            }
            return 'right';
        }


        function createSlimScrolling(element){
            //needed to make `scrollHeight` work under Opera 12
            element.css('overflow', 'hidden');

            var scrollOverflowHandler = options.scrollOverflowHandler;
            var wrap = scrollOverflowHandler.wrapContent();
            //in case element is a slide
            var section = element.closest(SECTION_SEL);
            var scrollable = scrollOverflowHandler.scrollable(element);
            var contentHeight;

            //if there was scroll, the contentHeight will be the one in the scrollable section
            if(scrollable.length){
                contentHeight = scrollOverflowHandler.scrollHeight(element);
            }else{
                contentHeight = element.get(0).scrollHeight;
                if(options.verticalCentered){
                    contentHeight = element.find(TABLE_CELL_SEL).get(0).scrollHeight;
                }
            }

            var scrollHeight = windowsHeight - parseInt(section.css('padding-bottom')) - parseInt(section.css('padding-top'));

            //needs scroll?
            if ( contentHeight > scrollHeight) {
                //was there already an scroll ? Updating it
                if(scrollable.length){
                    scrollOverflowHandler.update(element, scrollHeight);
                }
                //creating the scrolling
                else{
                    if(options.verticalCentered){
                        element.find(TABLE_CELL_SEL).wrapInner(wrap);
                    }else{
                        element.wrapInner(wrap);
                    }
                    scrollOverflowHandler.create(element, scrollHeight);
                }
            }
            //removing the scrolling when it is not necessary anymore
            else{
                scrollOverflowHandler.remove(element);
            }

            //undo
            element.css('overflow', '');
        }

        function addTableClass(element){
            element.addClass(TABLE).wrapInner('<div class="' + TABLE_CELL + '" style="height:' + getTableHeight(element) + 'px;" />');
        }

        function getTableHeight(element){
            var sectionHeight = windowsHeight;

            if(options.paddingTop || options.paddingBottom){
                var section = element;
                if(!section.hasClass(SECTION)){
                    section = element.closest(SECTION_SEL);
                }

                var paddings = parseInt(section.css('padding-top')) + parseInt(section.css('padding-bottom'));
                sectionHeight = (windowsHeight - paddings);
            }

            return sectionHeight;
        }

        /**
        * Adds a css3 transform property to the container class with or without animation depending on the animated param.
        */
        function transformContainer(translate3d, animated){
            if(animated){
                addAnimation(container);
            }else{
                removeAnimation(container);
            }

            container.css(getTransforms(translate3d));

            //syncronously removing the class after the animation has been applied.
            setTimeout(function(){
                container.removeClass(NO_TRANSITION);
            },10);
        }

        /**
        * Gets a section by its anchor / index
        */
        function getSectionByAnchor(sectionAnchor){
            //section
            var section = container.find(SECTION_SEL + '[data-anchor="'+sectionAnchor+'"]');
            if(!section.length){
                section = $(SECTION_SEL).eq( (sectionAnchor -1) );
            }

            return section;
        }

        /**
        * Gets a slide inside a given section by its anchor / index
        */
        function getSlideByAnchor(slideAnchor, section){
            var slides = section.find(SLIDES_WRAPPER_SEL);
            var slide =  slides.find(SLIDE_SEL + '[data-anchor="'+slideAnchor+'"]');

            if(!slide.length){
                slide = slides.find(SLIDE_SEL).eq(slideAnchor);
            }

            return slide;
        }

        /**
        * Scrolls to the given section and slide anchors
        */
        function scrollPageAndSlide(destiny, slide){
            var section = getSectionByAnchor(destiny);

            //default slide
            if (typeof slide === 'undefined') {
                slide = 0;
            }

            //we need to scroll to the section and then to the slide
            if (destiny !== lastScrolledDestiny && !section.hasClass(ACTIVE)){
                scrollPage(section, function(){
                    scrollSlider(section, slide);
                });
            }
            //if we were already in the section
            else{
                scrollSlider(section, slide);
            }
        }

        /**
        * Scrolls the slider to the given slide destination for the given section
        */
        function scrollSlider(section, slideAnchor){
            if(typeof slideAnchor !== 'undefined'){
                var slides = section.find(SLIDES_WRAPPER_SEL);
                var destiny =  getSlideByAnchor(slideAnchor, section);

                if(destiny.length){
                    landscapeScroll(slides, destiny);
                }
            }
        }

        /**
        * Creates a landscape navigation bar with dots for horizontal sliders.
        */
        function addSlidesNavigation(section, numSlides){
            section.append('<div class="' + SLIDES_NAV + '"><ul></ul></div>');
            var nav = section.find(SLIDES_NAV_SEL);

            //top or bottom
            nav.addClass(options.slidesNavPosition);

            for(var i=0; i< numSlides; i++){
                nav.find('ul').append('<li><a href="#"><span></span></a></li>');
            }

            //centering it
            nav.css('margin-left', '-' + (nav.width()/2) + 'px');

            nav.find('li').first().find('a').addClass(ACTIVE);
        }


        /**
        * Sets the state of the website depending on the active section/slide.
        * It changes the URL hash when needed and updates the body class.
        */
        function setState(slideIndex, slideAnchor, anchorLink, sectionIndex){
            var sectionHash = '';

            if(options.anchors.length && !options.lockAnchors){

                //isn't it the first slide?
                if(slideIndex){
                    if(typeof anchorLink !== 'undefined'){
                        sectionHash = anchorLink;
                    }

                    //slide without anchor link? We take the index instead.
                    if(typeof slideAnchor === 'undefined'){
                        slideAnchor = slideIndex;
                    }

                    lastScrolledSlide = slideAnchor;
                    setUrlHash(sectionHash + '/' + slideAnchor);

                //first slide won't have slide anchor, just the section one
                }else if(typeof slideIndex !== 'undefined'){
                    lastScrolledSlide = slideAnchor;
                    setUrlHash(anchorLink);
                }

                //section without slides
                else{
                    setUrlHash(anchorLink);
                }
            }

            setBodyClass();
        }

        /**
        * Sets the URL hash.
        */
        function setUrlHash(url){
            if(options.recordHistory){
                location.hash = url;
            }else{
                //Mobile Chrome doesn't work the normal way, so... lets use HTML5 for phones :)
                if(isTouchDevice || isTouch){
                    window.history.replaceState(undefined, undefined, '#' + url);
                }else{
                    var baseUrl = window.location.href.split('#')[0];
                    window.location.replace( baseUrl + '#' + url );
                }
            }
        }

        /**
        * Gets the anchor for the given slide / section. Its index will be used if there's none.
        */
        function getAnchor(element){
            var anchor = element.data('anchor');
            var index = element.index();

            //Slide without anchor link? We take the index instead.
            if(typeof anchor === 'undefined'){
                anchor = index;
            }

            return anchor;
        }

        /**
        * Sets a class for the body of the page depending on the active section / slide
        */
        function setBodyClass(){
            var section = $(SECTION_ACTIVE_SEL);
            var slide = section.find(SLIDE_ACTIVE_SEL);

            var sectionAnchor = getAnchor(section);
            var slideAnchor = getAnchor(slide);

            var sectionIndex = section.index(SECTION_SEL);

            var text = String(sectionAnchor);

            if(slide.length){
                text = text + '-' + slideAnchor;
            }

            //changing slash for dash to make it a valid CSS style
            text = text.replace('/', '-').replace('#','');

            //removing previous anchor classes
            var classRe = new RegExp('\\b\\s?' + VIEWING_PREFIX + '-[^\\s]+\\b', "g");
            $body[0].className = $body[0].className.replace(classRe, '');

            //adding the current anchor
            $body.addClass(VIEWING_PREFIX + '-' + text);
        }

        /**
        * Checks for translate3d support
        * @return boolean
        * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
        */
        function support3d() {
            var el = document.createElement('p'),
                has3d,
                transforms = {
                    'webkitTransform':'-webkit-transform',
                    'OTransform':'-o-transform',
                    'msTransform':'-ms-transform',
                    'MozTransform':'-moz-transform',
                    'transform':'transform'
                };

            // Add it to the body to get the computed style.
            document.body.insertBefore(el, null);

            for (var t in transforms) {
                if (el.style[t] !== undefined) {
                    el.style[t] = 'translate3d(1px,1px,1px)';
                    has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
                }
            }

            document.body.removeChild(el);

            return (has3d !== undefined && has3d.length > 0 && has3d !== 'none');
        }

        /**
        * Removes the auto scrolling action fired by the mouse wheel and trackpad.
        * After this function is called, the mousewheel and trackpad movements won't scroll through sections.
        */
        function removeMouseWheelHandler(){
            if (document.addEventListener) {
                document.removeEventListener('mousewheel', MouseWheelHandler, false); //IE9, Chrome, Safari, Oper
                document.removeEventListener('wheel', MouseWheelHandler, false); //Firefox
                document.removeEventListener('MozMousePixelScroll', MouseWheelHandler, false); //old Firefox
            } else {
                document.detachEvent('onmousewheel', MouseWheelHandler); //IE 6/7/8
            }
        }

        /**
        * Adds the auto scrolling action for the mouse wheel and trackpad.
        * After this function is called, the mousewheel and trackpad movements will scroll through sections
        * https://developer.mozilla.org/en-US/docs/Web/Events/wheel
        */
        function addMouseWheelHandler(){
            var prefix = '';
            var _addEventListener;

            if (window.addEventListener){
                _addEventListener = "addEventListener";
            }else{
                _addEventListener = "attachEvent";
                prefix = 'on';
            }

             // detect available wheel event
            var support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
                      document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
                      'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox


            if(support == 'DOMMouseScroll'){
                document[ _addEventListener ](prefix + 'MozMousePixelScroll', MouseWheelHandler, false);
            }

            //handle MozMousePixelScroll in older Firefox
            else{
                document[ _addEventListener ](prefix + support, MouseWheelHandler, false);
            }
        }

        /**
        * Binding the mousemove when the mouse's middle button is pressed
        */
        function addMiddleWheelHandler(){
            container
                .on('mousedown', mouseDownHandler)
                .on('mouseup', mouseUpHandler);
        }

        /**
        * Unbinding the mousemove when the mouse's middle button is released
        */
        function removeMiddleWheelHandler(){
            container
                .off('mousedown', mouseDownHandler)
                .off('mouseup', mouseUpHandler);
        }

        /**
        * Adds the possibility to auto scroll through sections on touch devices.
        */
        function addTouchHandler(){
            if(isTouchDevice || isTouch){
                //Microsoft pointers
                var MSPointer = getMSPointer();

                $(WRAPPER_SEL).off('touchstart ' +  MSPointer.down).on('touchstart ' + MSPointer.down, touchStartHandler);
                $(WRAPPER_SEL).off('touchmove ' + MSPointer.move).on('touchmove ' + MSPointer.move, touchMoveHandler);
            }
        }

        /**
        * Removes the auto scrolling for touch devices.
        */
        function removeTouchHandler(){
            if(isTouchDevice || isTouch){
                //Microsoft pointers
                var MSPointer = getMSPointer();

                $(WRAPPER_SEL).off('touchstart ' + MSPointer.down);
                $(WRAPPER_SEL).off('touchmove ' + MSPointer.move);
            }
        }

        /*
        * Returns and object with Microsoft pointers (for IE<11 and for IE >= 11)
        * http://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
        */
        function getMSPointer(){
            var pointer;

            //IE >= 11 & rest of browsers
            if(window.PointerEvent){
                pointer = { down: 'pointerdown', move: 'pointermove'};
            }

            //IE < 11
            else{
                pointer = { down: 'MSPointerDown', move: 'MSPointerMove'};
            }

            return pointer;
        }

        /**
        * Gets the pageX and pageY properties depending on the browser.
        * https://github.com/alvarotrigo/fullPage.js/issues/194#issuecomment-34069854
        */
        function getEventsPage(e){
            var events = [];

            events.y = (typeof e.pageY !== 'undefined' && (e.pageY || e.pageX) ? e.pageY : e.touches[0].pageY);
            events.x = (typeof e.pageX !== 'undefined' && (e.pageY || e.pageX) ? e.pageX : e.touches[0].pageX);

            //in touch devices with scrollBar:true, e.pageY is detected, but we have to deal with touch events. #1008
            if(isTouch && isReallyTouch(e) && options.scrollBar){
                events.y = e.touches[0].pageY;
                events.x = e.touches[0].pageX;
            }

            return events;
        }

        /**
        * Slides silently (with no animation) the active slider to the given slide.
        */
        function silentLandscapeScroll(activeSlide, noCallbacks){
            FP.setScrollingSpeed (0, 'internal');

            if(typeof noCallbacks !== 'undefined'){
                //preventing firing callbacks afterSlideLoad etc.
                isResizing = true;
            }

            landscapeScroll(activeSlide.closest(SLIDES_WRAPPER_SEL), activeSlide);

            if(typeof noCallbacks !== 'undefined'){
                isResizing = false;
            }

            FP.setScrollingSpeed(originals.scrollingSpeed, 'internal');
        }

        /**
        * Scrolls silently (with no animation) the page to the given Y position.
        */
        function silentScroll(top){
            if(options.scrollBar){
                container.scrollTop(top);
            }
            else if (options.css3) {
                var translate3d = 'translate3d(0px, -' + top + 'px, 0px)';
                transformContainer(translate3d, false);
            }
            else {
                container.css('top', -top);
            }
        }

        /**
        * Returns the cross-browser transform string.
        */
        function getTransforms(translate3d){
            return {
                '-webkit-transform': translate3d,
                '-moz-transform': translate3d,
                '-ms-transform':translate3d,
                'transform': translate3d
            };
        }

        /**
        * Allowing or disallowing the mouse/swipe scroll in a given direction. (not for keyboard)
        * @type  m (mouse) or k (keyboard)
        */
        function setIsScrollAllowed(value, direction, type){
            switch (direction){
                case 'up': isScrollAllowed[type].up = value; break;
                case 'down': isScrollAllowed[type].down = value; break;
                case 'left': isScrollAllowed[type].left = value; break;
                case 'right': isScrollAllowed[type].right = value; break;
                case 'all':
                    if(type == 'm'){
                        FP.setAllowScrolling(value);
                    }else{
                        FP.setKeyboardScrolling(value);
                    }
            }
        }

        /*
        * Destroys fullpage.js plugin events and optinally its html markup and styles
        */
        FP.destroy = function(all){
            FP.setAutoScrolling(false, 'internal');
            FP.setAllowScrolling(false);
            FP.setKeyboardScrolling(false);
            container.addClass(DESTROYED);

            clearTimeout(afterSlideLoadsId);
            clearTimeout(afterSectionLoadsId);
            clearTimeout(resizeId);
            clearTimeout(scrollId);
            clearTimeout(scrollId2);

            $window
                .off('scroll', scrollHandler)
                .off('hashchange', hashChangeHandler)
                .off('resize', resizeHandler);

            $document
                .off('click', SECTION_NAV_SEL + ' a')
                .off('mouseenter', SECTION_NAV_SEL + ' li')
                .off('mouseleave', SECTION_NAV_SEL + ' li')
                .off('click', SLIDES_NAV_LINK_SEL)
                .off('mouseover', options.normalScrollElements)
                .off('mouseout', options.normalScrollElements);

            $(SECTION_SEL)
                .off('click', SLIDES_ARROW_SEL);

            clearTimeout(afterSlideLoadsId);
            clearTimeout(afterSectionLoadsId);

            //lets make a mess!
            if(all){
                destroyStructure();
            }
        };

        /*
        * Removes inline styles added by fullpage.js
        */
        function destroyStructure(){
            //reseting the `top` or `translate` properties to 0
            silentScroll(0);

            $(SECTION_NAV_SEL + ', ' + SLIDES_NAV_SEL +  ', ' + SLIDES_ARROW_SEL).remove();

            //removing inline styles
            $(SECTION_SEL).css( {
                'height': '',
                'background-color' : '',
                'padding': ''
            });

            $(SLIDE_SEL).css( {
                'width': ''
            });

            container.css({
                'height': '',
                'position': '',
                '-ms-touch-action': '',
                'touch-action': ''
            });

            $htmlBody.css({
                'overflow': '',
                'height': ''
            });

            // remove .fp-enabled class
            $('html').removeClass(ENABLED);

            // remove all of the .fp-viewing- classes
            $.each($body.get(0).className.split(/\s+/), function (index, className) {
                if (className.indexOf(VIEWING_PREFIX) === 0) {
                    $body.removeClass(className);
                }
            });

            //removing added classes
            $(SECTION_SEL + ', ' + SLIDE_SEL).each(function(){
                options.scrollOverflowHandler.remove($(this));
                $(this).removeClass(TABLE + ' ' + ACTIVE);
            });

            removeAnimation(container);

            //Unwrapping content
            container.find(TABLE_CELL_SEL + ', ' + SLIDES_CONTAINER_SEL + ', ' + SLIDES_WRAPPER_SEL).each(function(){
                //unwrap not being use in case there's no child element inside and its just text
                $(this).replaceWith(this.childNodes);
            });

            //scrolling the page to the top with no animation
            $htmlBody.scrollTop(0);

            //removing selectors
            var usedSelectors = [SECTION, SLIDE, SLIDES_CONTAINER];
            $.each(usedSelectors, function(index, value){
                $('.' + value).removeClass(value);
            });
        }

        /*
        * Sets the state for a variable with multiple states (original, and temporal)
        * Some variables such as `autoScrolling` or `recordHistory` might change automatically its state when using `responsive` or `autoScrolling:false`.
        * This function is used to keep track of both states, the original and the temporal one.
        * If type is not 'internal', then we assume the user is globally changing the variable.
        */
        function setVariableState(variable, value, type){
            options[variable] = value;
            if(type !== 'internal'){
                originals[variable] = value;
            }
        }

        /**
        * Displays warnings
        */
        function displayWarnings(){
            if($('html').hasClass(ENABLED)){
                showError('error', 'Fullpage.js can only be initialized once and you are doing it multiple times!');
                return;
            }

            // Disable mutually exclusive settings
            if (options.continuousVertical &&
                (options.loopTop || options.loopBottom)) {
                options.continuousVertical = false;
                showError('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
            }

            if(options.scrollBar && options.scrollOverflow){
                showError('warn', 'Option `scrollBar` is mutually exclusive with `scrollOverflow`. Sections with scrollOverflow might not work well in Firefox');
            }

            if(options.continuousVertical && options.scrollBar){
                options.continuousVertical = false;
                showError('warn', 'Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled');
            }

            //anchors can not have the same value as any element ID or NAME
            $.each(options.anchors, function(index, name){

                //case insensitive selectors (http://stackoverflow.com/a/19465187/1081396)
                var nameAttr = $document.find('[name]').filter(function() {
                    return $(this).attr('name') && $(this).attr('name').toLowerCase() == name.toLowerCase();
                });

                var idAttr = $document.find('[id]').filter(function() {
                    return $(this).attr('id') && $(this).attr('id').toLowerCase() == name.toLowerCase();
                });

                if(idAttr.length || nameAttr.length ){
                    showError('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).');
                    idAttr.length && showError('error', '"' + name + '" is is being used by another element `id` property');
                    nameAttr.length && showError('error', '"' + name + '" is is being used by another element `name` property');
                }
            });
        }

        /**
        * Shows a message in the console of the given type.
        */
        function showError(type, text){
            console && console[type] && console[type]('fullPage: ' + text);
        }
    };

    /**
     * An object to handle overflow scrolling.
     * This uses jquery.slimScroll to accomplish overflow scrolling.
     * It is possible to pass in an alternate scrollOverflowHandler
     * to the fullpage.js option that implements the same functions
     * as this handler.
     *
     * @type {Object}
     */
    var slimScrollHandler = {
        /**
         * Optional function called after each render.
         *
         * Solves a bug with slimScroll vendor library #1037, #553
         *
         * @param  {object} section jQuery object containing rendered section
         */
        afterRender: function(section){
            var slides = section.find(SLIDES_WRAPPER);
            var scrollableWrap = section.find(SCROLLABLE_SEL);

            if(slides.length){
                scrollableWrap = slides.find(SLIDE_ACTIVE_SEL);
            }

            scrollableWrap.mouseover();
        },

        /**
         * Called when overflow scrolling is needed for a section.
         *
         * @param  {Object} element      jQuery object containing current section
         * @param  {Number} scrollHeight Current window height in pixels
         */
        create: function(element, scrollHeight){
            element.find(SCROLLABLE_SEL).slimScroll({
                allowPageScroll: true,
                height: scrollHeight + 'px',
                size: '10px',
                alwaysVisible: true
            });
        },

        /**
         * Return a boolean depending on whether the scrollable element is a
         * the end or at the start of the scrolling depending on the given type.
         *
         * @param  {String}  type       Either 'top' or 'bottom'
         * @param  {Object}  scrollable jQuery object for the scrollable element
         * @return {Boolean}
         */
        isScrolled: function(type, scrollable){
            if(type === 'top'){
                return !scrollable.scrollTop();
            }else if(type === 'bottom'){
                return scrollable.scrollTop() + 1 + scrollable.innerHeight() >= scrollable[0].scrollHeight;
            }
        },

        /**
         * Returns the scrollable element for the given section.
         * If there are landscape slides, will only return a scrollable element
         * if it is in the active slide.
         *
         * @param  {Object}  activeSection jQuery object containing current section
         * @return {Boolean}
         */
        scrollable: function(activeSection){
            // if there are landscape slides, we check if the scrolling bar is in the current one or not
            if(activeSection.find(SLIDES_WRAPPER_SEL).length){
                return activeSection.find(SLIDE_ACTIVE_SEL).find(SCROLLABLE_SEL);
            }
            return activeSection.find(SCROLLABLE_SEL);
        },

        /**
         * Returns the scroll height of the wrapped content.
         * If this is larger than the window height minus section padding,
         * overflow scrolling is needed.
         *
         * @param  {Object} element jQuery object containing current section
         * @return {Number}
         */
        scrollHeight: function(element){
            return element.find(SCROLLABLE_SEL).get(0).scrollHeight;
        },

        /**
         * Called when overflow scrolling is no longer needed for a section.
         *
         * @param  {Object} element      jQuery object containing current section
         */
        remove: function(element){
            element.find(SCROLLABLE_SEL).children().first().unwrap().unwrap();
            element.find(SLIMSCROLL_BAR_SEL).remove();
            element.find(SLIMSCROLL_RAIL_SEL).remove();
        },

        /**
         * Called when overflow scrolling has already been setup but the
         * window height has potentially changed.
         *
         * @param  {Object} element      jQuery object containing current section
         * @param  {Number} scrollHeight Current window height in pixels
         */
        update: function(element, scrollHeight){
            element.find(SCROLLABLE_SEL).css('height', scrollHeight + 'px').parent().css('height', scrollHeight + 'px');
        },

        /**
         * Called to get any additional elements needed to wrap the section
         * content in order to facilitate overflow scrolling.
         *
         * @return {String|Object} Can be a string containing HTML,
         *                         a DOM element, or jQuery object.
         */
        wrapContent: function(){
            return '<div class="' + SCROLLABLE + '"></div>';
        }
    };

    defaultScrollHandler = slimScrollHandler;

});

;(function() {
  'use strict';

  angular
    .module('fullPage.js', [])
    .directive('fullPage', fullPage);

  fullPage.$inject = ['$timeout'];

  function fullPage($timeout) {
    var directive = {
      restrict: 'A',
      scope: {
          options: '='
      },
      link: link
    };

    return directive;

    function link(scope, element) {
      var pageIndex;
      var slideIndex;
      var afterRender;
      var onLeave;
      var onSlideLeave;

      if (typeof scope.options === 'object') {
        if (scope.options.afterRender) {
          afterRender = scope.options.afterRender;
        }

        if (scope.options.onLeave) {
          onLeave = scope.options.onLeave;
        }

        if (scope.options.onSlideLeave) {
          onSlideLeave = scope.options.onSlideLeave;
        }
      } else if(typeof options === 'undefined') {
        scope.options = {};
      }

      var rebuild = function() {
        destroyFullPage();

        $(element).fullpage(sanatizeOptions(scope.options));

        if (typeof afterRender === 'function') {
          afterRender();
        }
      };

      var destroyFullPage = function() {
        if ($.fn.fullpage.destroy) {
          $.fn.fullpage.destroy('all');
        }
      };

      var sanatizeOptions = function(options) {
        options.afterRender = afterAngularRender;
        options.onLeave = onAngularLeave;
        options.onSlideLeave = onAngularSlideLeave;

        function afterAngularRender() {
          //We want to remove the HREF targets for navigation because they use hashbang
          //They still work without the hash though, so its all good.
          if (options && options.navigation) {
            $('#fp-nav').find('a').removeAttr('href');
          }

          if (pageIndex) {
            $timeout(function() {
              $.fn.fullpage.silentMoveTo(pageIndex, slideIndex);
            });
          }
        }

        function onAngularLeave(page, next, direction){

          if (typeof onLeave === 'function' && onLeave(page, next, direction) === false) {
            return false;
          }
          pageIndex = next;

        }

        function onAngularSlideLeave(anchorLink, page, slide, direction, next) {

          if (typeof onSlideLeave === 'function' && onSlideLeave(anchorLink, page, slide, direction, next) === false) {
            return false;
          }
          pageIndex   = page;
          slideIndex  = next;

        }

        //if we are using a ui-router, we need to be able to handle anchor clicks without 'href="#thing"'
        $(document).on('click', '[data-menuanchor]', function () {
          $.fn.fullpage.moveTo($(this).attr('data-menuanchor'));
        });

        return options;
      };

      var watchNodes = function() {
        return element[0].getElementsByTagName('*').length;
      };

      scope.$watch(watchNodes, rebuild);

      scope.$watch('options', rebuild, true);

      element.on('$destroy', destroyFullPage);
    }
  }

})();

/** @license
 *
 * SoundManager 2: JavaScript Sound for the Web
 * ----------------------------------------------
 * http://schillmania.com/projects/soundmanager2/
 *
 * Copyright (c) 2007, Scott Schiller. All rights reserved.
 * Code provided under the BSD License:
 * http://schillmania.com/projects/soundmanager2/license.txt
 *
 * V2.97a.20140901
 */
/*global window, SM2_DEFER, sm2Debugger, console, document, navigator, setTimeout, setInterval, clearInterval, Audio, opera, module, define */
/*jslint regexp: true, sloppy: true, white: true, nomen: true, plusplus: true, todo: true */
/**
 * About this file
 * -------------------------------------------------------------------------------------
 * This is the fully-commented source version of the SoundManager 2 API,
 * recommended for use during development and testing.
 *
 * See soundmanager2-nodebug-jsmin.js for an optimized build (~11KB with gzip.)
 * http://schillmania.com/projects/soundmanager2/doc/getstarted/#basic-inclusion
 * Alternately, serve this file with gzip for 75% compression savings (~30KB over HTTP.)
 *
 * You may notice <d> and </d> comments in this source; these are delimiters for
 * debug blocks which are removed in the -nodebug builds, further optimizing code size.
 *
 * Also, as you may note: Whoa, reliable cross-platform/device audio support is hard! ;)
 */
(function(window, _undefined) {
    "use strict";
    if(!window || !window.document) {
        // Don't cross the [environment] streams. SM2 expects to be running in a browser, not under node.js etc.
        // Additionally, if a browser somehow manages to fail this test, as Egon said: "It would be bad."
        throw new Error('SoundManager requires a browser with window and document objects.');
    }
    var soundManager = null;
    /**
     * The SoundManager constructor.
     *
     * @constructor
     * @param {string} smURL Optional: Path to SWF files
     * @param {string} smID Optional: The ID to use for the SWF container element
     * @this {SoundManager}
     * @return {SoundManager} The new SoundManager instance
     */

    function SoundManager(smURL, smID) {
        /**
         * soundManager configuration options list
         * defines top-level configuration properties to be applied to the soundManager instance (eg. soundManager.flashVersion)
         * to set these properties, use the setup() method - eg., soundManager.setup({url: '/swf/', flashVersion: 9})
         */
        this.setupOptions = {
            'url': (smURL || null), // path (directory) where SoundManager 2 SWFs exist, eg., /path/to/swfs/
            'flashVersion': 8, // flash build to use (8 or 9.) Some API features require 9.
            'debugMode': true, // enable debugging output (console.log() with HTML fallback)
            'debugFlash': false, // enable debugging output inside SWF, troubleshoot Flash/browser issues
            'useConsole': true, // use console.log() if available (otherwise, writes to #soundmanager-debug element)
            'consoleOnly': true, // if console is being used, do not create/write to #soundmanager-debug
            'waitForWindowLoad': false, // force SM2 to wait for window.onload() before trying to call soundManager.onload()
            'bgColor': '#ffffff', // SWF background color. N/A when wmode = 'transparent'
            'useHighPerformance': false, // position:fixed flash movie can help increase js/flash speed, minimize lag
            'flashPollingInterval': null, // msec affecting whileplaying/loading callback frequency. If null, default of 50 msec is used.
            'html5PollingInterval': null, // msec affecting whileplaying() for HTML5 audio, excluding mobile devices. If null, native HTML5 update events are used.
            'flashLoadTimeout': 1000, // msec to wait for flash movie to load before failing (0 = infinity)
            'wmode': null, // flash rendering mode - null, 'transparent', or 'opaque' (last two allow z-index to work)
            'allowScriptAccess': 'always', // for scripting the SWF (object/embed property), 'always' or 'sameDomain'
            'useFlashBlock': false, // *requires flashblock.css, see demos* - allow recovery from flash blockers. Wait indefinitely and apply timeout CSS to SWF, if applicable.
            'useHTML5Audio': true, // use HTML5 Audio() where API is supported (most Safari, Chrome versions), Firefox (no MP3/MP4.) Ideally, transparent vs. Flash API where possible.
            'html5Test': /^(probably|maybe)$/i, // HTML5 Audio() format support test. Use /^probably$/i; if you want to be more conservative.
            'preferFlash': false, // overrides useHTML5audio, will use Flash for MP3/MP4/AAC if present. Potential option if HTML5 playback with these formats is quirky.
            'noSWFCache': false, // if true, appends ?ts={date} to break aggressive SWF caching.
            'idPrefix': 'sound' // if an id is not provided to createSound(), this prefix is used for generated IDs - 'sound0', 'sound1' etc.
        };
        this.defaultOptions = {
            /**
             * the default configuration for sound objects made with createSound() and related methods
             * eg., volume, auto-load behaviour and so forth
             */
            'autoLoad': false, // enable automatic loading (otherwise .load() will be called on demand with .play(), the latter being nicer on bandwidth - if you want to .load yourself, you also can)
            'autoPlay': false, // enable playing of file as soon as possible (much faster if "stream" is true)
            'from': null, // position to start playback within a sound (msec), default = beginning
            'loops': 1, // how many times to repeat the sound (position will wrap around to 0, setPosition() will break out of loop when >0)
            'onid3': null, // callback function for "ID3 data is added/available"
            'onload': null, // callback function for "load finished"
            'whileloading': null, // callback function for "download progress update" (X of Y bytes received)
            'onplay': null, // callback for "play" start
            'onpause': null, // callback for "pause"
            'onresume': null, // callback for "resume" (pause toggle)
            'whileplaying': null, // callback during play (position update)
            'onposition': null, // object containing times and function callbacks for positions of interest
            'onstop': null, // callback for "user stop"
            'onfailure': null, // callback function for when playing fails
            'onfinish': null, // callback function for "sound finished playing"
            'multiShot': true, // let sounds "restart" or layer on top of each other when played multiple times, rather than one-shot/one at a time
            'multiShotEvents': false, // fire multiple sound events (currently onfinish() only) when multiShot is enabled
            'position': null, // offset (milliseconds) to seek to within loaded sound data.
            'pan': 0, // "pan" settings, left-to-right, -100 to 100
            'stream': true, // allows playing before entire file has loaded (recommended)
            'to': null, // position to end playback within a sound (msec), default = end
            'type': null, // MIME-like hint for file pattern / canPlay() tests, eg. audio/mp3
            'usePolicyFile': false, // enable crossdomain.xml request for audio on remote domains (for ID3/waveform access)
            'volume': 100 // self-explanatory. 0-100, the latter being the max.
        };
        this.flash9Options = {
            /**
             * flash 9-only options,
             * merged into defaultOptions if flash 9 is being used
             */
            'isMovieStar': null, // "MovieStar" MPEG4 audio mode. Null (default) = auto detect MP4, AAC etc. based on URL. true = force on, ignore URL
            'usePeakData': false, // enable left/right channel peak (level) data
            'useWaveformData': false, // enable sound spectrum (raw waveform data) - NOTE: May increase CPU load.
            'useEQData': false, // enable sound EQ (frequency spectrum data) - NOTE: May increase CPU load.
            'onbufferchange': null, // callback for "isBuffering" property change
            'ondataerror': null // callback for waveform/eq data access error (flash playing audio in other tabs/domains)
        };
        this.movieStarOptions = {
            /**
             * flash 9.0r115+ MPEG4 audio options,
             * merged into defaultOptions if flash 9+movieStar mode is enabled
             */
            'bufferTime': 3, // seconds of data to buffer before playback begins (null = flash default of 0.1 seconds - if AAC playback is gappy, try increasing.)
            'serverURL': null, // rtmp: FMS or FMIS server to connect to, required when requesting media via RTMP or one of its variants
            'onconnect': null, // rtmp: callback for connection to flash media server
            'duration': null // rtmp: song duration (msec)
        };
        this.audioFormats = {
            /**
             * determines HTML5 support + flash requirements.
             * if no support (via flash and/or HTML5) for a "required" format, SM2 will fail to start.
             * flash fallback is used for MP3 or MP4 if HTML5 can't play it (or if preferFlash = true)
             */
            'mp3': {
                'type': ['audio/mpeg; codecs="mp3"', 'audio/mpeg', 'audio/mp3', 'audio/MPA', 'audio/mpa-robust'],
                'required': true
            },
            'mp4': {
                'related': ['aac', 'm4a', 'm4b'], // additional formats under the MP4 container
                'type': ['audio/mp4; codecs="mp4a.40.2"', 'audio/aac', 'audio/x-m4a', 'audio/MP4A-LATM', 'audio/mpeg4-generic'],
                'required': false
            },
            'ogg': {
                'type': ['audio/ogg; codecs=vorbis'],
                'required': false
            },
            'opus': {
                'type': ['audio/ogg; codecs=opus', 'audio/opus'],
                'required': false
            },
            'wav': {
                'type': ['audio/wav; codecs="1"', 'audio/wav', 'audio/wave', 'audio/x-wav'],
                'required': false
            }
        };
        // HTML attributes (id + class names) for the SWF container
        this.movieID = 'sm2-container';
        this.id = (smID || 'sm2movie');
        this.debugID = 'soundmanager-debug';
        this.debugURLParam = /([#?&])debug=1/i;
        // dynamic attributes
        this.versionNumber = 'V2.97a.20140901';
        this.version = null;
        this.movieURL = null;
        this.altURL = null;
        this.swfLoaded = false;
        this.enabled = false;
        this.oMC = null;
        this.sounds = {};
        this.soundIDs = [];
        this.muted = false;
        this.didFlashBlock = false;
        this.filePattern = null;
        this.filePatterns = {
            'flash8': /\.mp3(\?.*)?$/i,
            'flash9': /\.mp3(\?.*)?$/i
        };
        // support indicators, set at init
        this.features = {
            'buffering': false,
            'peakData': false,
            'waveformData': false,
            'eqData': false,
            'movieStar': false
        };
        // flash sandbox info, used primarily in troubleshooting
        this.sandbox = {
            // <d>
            'type': null,
            'types': {
                'remote': 'remote (domain-based) rules',
                'localWithFile': 'local with file access (no internet access)',
                'localWithNetwork': 'local with network (internet access only, no local access)',
                'localTrusted': 'local, trusted (local+internet access)'
            },
            'description': null,
            'noRemote': null,
            'noLocal': null
            // </d>
        };
        /**
         * format support (html5/flash)
         * stores canPlayType() results based on audioFormats.
         * eg. { mp3: boolean, mp4: boolean }
         * treat as read-only.
         */
        this.html5 = {
            'usingFlash': null // set if/when flash fallback is needed
        };
        // file type support hash
        this.flash = {};
        // determined at init time
        this.html5Only = false;
        // used for special cases (eg. iPad/iPhone/palm OS?)
        this.ignoreFlash = false;
        /**
         * a few private internals (OK, a lot. :D)
         */
        var SMSound,
            sm2 = this,
            globalHTML5Audio = null,
            flash = null,
            sm = 'soundManager',
            smc = sm + ': ',
            h5 = 'HTML5::',
            id, ua = navigator.userAgent,
            wl = window.location.href.toString(),
            doc = document,
            doNothing, setProperties, init, fV, on_queue = [],
            debugOpen = true,
            debugTS, didAppend = false,
            appendSuccess = false,
            didInit = false,
            disabled = false,
            windowLoaded = false,
            _wDS, wdCount = 0,
            initComplete, mixin, assign, extraOptions, addOnEvent, processOnEvents, initUserOnload, delayWaitForEI, waitForEI, rebootIntoHTML5, setVersionInfo, handleFocus, strings, initMovie, preInit, domContentLoaded, winOnLoad, didDCLoaded, getDocument, createMovie, catchError, setPolling, initDebug, debugLevels = ['log', 'info', 'warn', 'error'],
            defaultFlashVersion = 8,
            disableObject, failSafely, normalizeMovieURL, oRemoved = null,
            oRemovedHTML = null,
            str, flashBlockHandler, getSWFCSS, swfCSS, toggleDebug, loopFix, policyFix, complain, idCheck, waitingForEI = false,
            initPending = false,
            startTimer, stopTimer, timerExecute, h5TimerCount = 0,
            h5IntervalTimer = null,
            parseURL, messages = [],
            canIgnoreFlash, needsFlash = null,
            featureCheck, html5OK, html5CanPlay, html5Ext, html5Unload, domContentLoadedIE, testHTML5, event, slice = Array.prototype.slice,
            useGlobalHTML5Audio = false,
            lastGlobalHTML5URL, hasFlash, detectFlash, badSafariFix, html5_events, showSupport, flushMessages, wrapCallback, idCounter = 0,
            is_iDevice = ua.match(/(ipad|iphone|ipod)/i),
            isAndroid = ua.match(/android/i),
            isIE = ua.match(/msie/i),
            isWebkit = ua.match(/webkit/i),
            isSafari = (ua.match(/safari/i) && !ua.match(/chrome/i)),
            isOpera = (ua.match(/opera/i)),
            mobileHTML5 = (ua.match(/(mobile|pre\/|xoom)/i) || is_iDevice || isAndroid),
            isBadSafari = (!wl.match(/usehtml5audio/i) && !wl.match(/sm2\-ignorebadua/i) && isSafari && !ua.match(/silk/i) && ua.match(/OS X 10_6_([3-7])/i)), // Safari 4 and 5 (excluding Kindle Fire, "Silk") occasionally fail to load/play HTML5 audio on Snow Leopard 10.6.3 through 10.6.7 due to bug(s) in QuickTime X and/or other underlying frameworks. :/ Confirmed bug. https://bugs.webkit.org/show_bug.cgi?id=32159
            hasConsole = (window.console !== _undefined && console.log !== _undefined),
            isFocused = (doc.hasFocus !== _undefined ? doc.hasFocus() : null),
            tryInitOnFocus = (isSafari && (doc.hasFocus === _undefined || !doc.hasFocus())),
            okToDisable = !tryInitOnFocus,
            flashMIME = /(mp3|mp4|mpa|m4a|m4b)/i,
            msecScale = 1000,
            emptyURL = 'about:blank', // safe URL to unload, or load nothing from (flash 8 + most HTML5 UAs)
            emptyWAV = 'data:audio/wave;base64,/UklGRiYAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQIAAAD//w==', // tiny WAV for HTML5 unloading
            overHTTP = (doc.location ? doc.location.protocol.match(/http/i) : null),
            http = (!overHTTP ? 'http:/' + '/' : ''),
            // mp3, mp4, aac etc.
            netStreamMimeTypes = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|m4b|mp4v|3gp|3g2)\s*(?:$|;)/i,
            // Flash v9.0r115+ "moviestar" formats
            netStreamTypes = ['mpeg4', 'aac', 'flv', 'mov', 'mp4', 'm4v', 'f4v', 'm4a', 'm4b', 'mp4v', '3gp', '3g2'],
            netStreamPattern = new RegExp('\\.(' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i; // default mp3 set
        // use altURL if not "online"
        this.useAltURL = !overHTTP;
        swfCSS = {
            'swfBox': 'sm2-object-box',
            'swfDefault': 'movieContainer',
            'swfError': 'swf_error', // SWF loaded, but SM2 couldn't start (other error)
            'swfTimedout': 'swf_timedout',
            'swfLoaded': 'swf_loaded',
            'swfUnblocked': 'swf_unblocked', // or loaded OK
            'sm2Debug': 'sm2_debug',
            'highPerf': 'high_performance',
            'flashDebug': 'flash_debug'
        };
        /**
         * basic HTML5 Audio() support test
         * try...catch because of IE 9 "not implemented" nonsense
         * https://github.com/Modernizr/Modernizr/issues/224
         */
        this.hasHTML5 = (function() {
            try {
                // new Audio(null) for stupid Opera 9.64 case, which throws not_enough_arguments exception otherwise.
                return(Audio !== _undefined && (isOpera && opera !== _undefined && opera.version() < 10 ? new Audio(null) : new Audio()).canPlayType !== _undefined);
            } catch(e) {
                return false;
            }
        }());
        /**
         * Public SoundManager API
         * -----------------------
         */
        /**
         * Configures top-level soundManager properties.
         *
         * @param {object} options Option parameters, eg. { flashVersion: 9, url: '/path/to/swfs/' }
         * onready and ontimeout are also accepted parameters. call soundManager.setup() to see the full list.
         */
        this.setup = function(options) {
            var noURL = (!sm2.url);
            // warn if flash options have already been applied
            if(options !== _undefined && didInit && needsFlash && sm2.ok() && (options.flashVersion !== _undefined || options.url !== _undefined || options.html5Test !== _undefined)) {
                complain(str('setupLate'));
            }
            // TODO: defer: true?
            assign(options);
            // special case 1: "Late setup". SM2 loaded normally, but user didn't assign flash URL eg., setup({url:...}) before SM2 init. Treat as delayed init.
            if(options) {
                if(noURL && didDCLoaded && options.url !== _undefined) {
                    sm2.beginDelayedInit();
                }
                // special case 2: If lazy-loading SM2 (DOMContentLoaded has already happened) and user calls setup() with url: parameter, try to init ASAP.
                if(!didDCLoaded && options.url !== _undefined && doc.readyState === 'complete') {
                    setTimeout(domContentLoaded, 1);
                }
            }
            return sm2;
        };
        this.ok = function() {
            return(needsFlash ? (didInit && !disabled) : (sm2.useHTML5Audio && sm2.hasHTML5));
        };
        this.supported = this.ok; // legacy
        this.getMovie = function(smID) {
            // safety net: some old browsers differ on SWF references, possibly related to ExternalInterface / flash version
            return id(smID) || doc[smID] || window[smID];
        };
        /**
         * Creates a SMSound sound object instance.
         *
         * @param {object} oOptions Sound options (at minimum, id and url parameters are required.)
         * @return {object} SMSound The new SMSound object.
         */
        this.createSound = function(oOptions, _url) {
            var cs, cs_string, options, oSound = null;
            // <d>
            cs = sm + '.createSound(): ';
            cs_string = cs + str(!didInit ? 'notReady' : 'notOK');
            // </d>
            if(!didInit || !sm2.ok()) {
                complain(cs_string);
                return false;
            }
            if(_url !== _undefined) {
                // function overloading in JS! :) ..assume simple createSound(id, url) use case
                oOptions = {
                    'id': oOptions,
                    'url': _url
                };
            }
            // inherit from defaultOptions
            options = mixin(oOptions);
            options.url = parseURL(options.url);
            // generate an id, if needed.
            if(options.id === undefined) {
                options.id = sm2.setupOptions.idPrefix + (idCounter++);
            }
            // <d>
            if(options.id.toString().charAt(0).match(/^[0-9]$/)) {
                sm2._wD(cs + str('badID', options.id), 2);
            }
            sm2._wD(cs + options.id + (options.url ? ' (' + options.url + ')' : ''), 1);
            // </d>
            if(idCheck(options.id, true)) {
                sm2._wD(cs + options.id + ' exists', 1);
                return sm2.sounds[options.id];
            }

            function make() {
                options = loopFix(options);
                sm2.sounds[options.id] = new SMSound(options);
                sm2.soundIDs.push(options.id);
                return sm2.sounds[options.id];
            }
            if(html5OK(options)) {
                oSound = make();
                sm2._wD(options.id + ': Using HTML5');
                oSound._setup_html5(options);
            } else {
                if(sm2.html5Only) {
                    sm2._wD(options.id + ': No HTML5 support for this sound, and no Flash. Exiting.');
                    return make();
                }
                // TODO: Move HTML5/flash checks into generic URL parsing/handling function.
                if(sm2.html5.usingFlash && options.url && options.url.match(/data\:/i)) {
                    // data: URIs not supported by Flash, either.
                    sm2._wD(options.id + ': data: URIs not supported via Flash. Exiting.');
                    return make();
                }
                if(fV > 8) {
                    if(options.isMovieStar === null) {
                        // attempt to detect MPEG-4 formats
                        options.isMovieStar = !! (options.serverURL || (options.type ? options.type.match(netStreamMimeTypes) : false) || (options.url && options.url.match(netStreamPattern)));
                    }
                    // <d>
                    if(options.isMovieStar) {
                        sm2._wD(cs + 'using MovieStar handling');
                        if(options.loops > 1) {
                            _wDS('noNSLoop');
                        }
                    }
                    // </d>
                }
                options = policyFix(options, cs);
                oSound = make();
                if(fV === 8) {
                    flash._createSound(options.id, options.loops || 1, options.usePolicyFile);
                } else {
                    flash._createSound(options.id, options.url, options.usePeakData, options.useWaveformData, options.useEQData, options.isMovieStar, (options.isMovieStar ? options.bufferTime : false), options.loops || 1, options.serverURL, options.duration || null, options.autoPlay, true, options.autoLoad, options.usePolicyFile);
                    if(!options.serverURL) {
                        // We are connected immediately
                        oSound.connected = true;
                        if(options.onconnect) {
                            options.onconnect.apply(oSound);
                        }
                    }
                }
                if(!options.serverURL && (options.autoLoad || options.autoPlay)) {
                    // call load for non-rtmp streams
                    oSound.load(options);
                }
            }
            // rtmp will play in onconnect
            if(!options.serverURL && options.autoPlay) {
                oSound.play();
            }
            return oSound;
        };
        /**
         * Destroys a SMSound sound object instance.
         *
         * @param {string} sID The ID of the sound to destroy
         */
        this.destroySound = function(sID, _bFromSound) {
            // explicitly destroy a sound before normal page unload, etc.
            if(!idCheck(sID)) {
                return false;
            }
            var oS = sm2.sounds[sID],
                i;
            // Disable all callbacks while the sound is being destroyed
            oS._iO = {};
            oS.stop();
            oS.unload();
            for(i = 0; i < sm2.soundIDs.length; i++) {
                if(sm2.soundIDs[i] === sID) {
                    sm2.soundIDs.splice(i, 1);
                    break;
                }
            }
            if(!_bFromSound) {
                // ignore if being called from SMSound instance
                oS.destruct(true);
            }
            oS = null;
            delete sm2.sounds[sID];
            return true;
        };
        /**
         * Calls the load() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @param {object} oOptions Optional: Sound options
         */
        this.load = function(sID, oOptions) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].load(oOptions);
        };
        /**
         * Calls the unload() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         */
        this.unload = function(sID) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].unload();
        };
        /**
         * Calls the onPosition() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @param {number} nPosition The position to watch for
         * @param {function} oMethod The relevant callback to fire
         * @param {object} oScope Optional: The scope to apply the callback to
         * @return {SMSound} The SMSound object
         */
        this.onPosition = function(sID, nPosition, oMethod, oScope) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].onposition(nPosition, oMethod, oScope);
        };
        // legacy/backwards-compability: lower-case method name
        this.onposition = this.onPosition;
        /**
         * Calls the clearOnPosition() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @param {number} nPosition The position to watch for
         * @param {function} oMethod Optional: The relevant callback to fire
         * @return {SMSound} The SMSound object
         */
        this.clearOnPosition = function(sID, nPosition, oMethod) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].clearOnPosition(nPosition, oMethod);
        };
        /**
         * Calls the play() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @param {object} oOptions Optional: Sound options
         * @return {SMSound} The SMSound object
         */
        this.play = function(sID, oOptions) {
            var result = null,
                // legacy function-overloading use case: play('mySound', '/path/to/some.mp3');
                overloaded = (oOptions && !(oOptions instanceof Object));
            if(!didInit || !sm2.ok()) {
                complain(sm + '.play(): ' + str(!didInit ? 'notReady' : 'notOK'));
                return false;
            }
            if(!idCheck(sID, overloaded)) {
                if(!overloaded) {
                    // no sound found for the given ID. Bail.
                    return false;
                }
                if(overloaded) {
                    oOptions = {
                        url: oOptions
                    };
                }
                if(oOptions && oOptions.url) {
                    // overloading use case, create+play: .play('someID', {url:'/path/to.mp3'});
                    sm2._wD(sm + '.play(): Attempting to create "' + sID + '"', 1);
                    oOptions.id = sID;
                    result = sm2.createSound(oOptions).play();
                }
            } else if(overloaded) {
                // existing sound object case
                oOptions = {
                    url: oOptions
                };
            }
            if(result === null) {
                // default case
                result = sm2.sounds[sID].play(oOptions);
            }
            return result;
        };
        this.start = this.play; // just for convenience
        /**
         * Calls the setPosition() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @param {number} nMsecOffset Position (milliseconds)
         * @return {SMSound} The SMSound object
         */
        this.setPosition = function(sID, nMsecOffset) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].setPosition(nMsecOffset);
        };
        /**
         * Calls the stop() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.stop = function(sID) {
            if(!idCheck(sID)) {
                return false;
            }
            sm2._wD(sm + '.stop(' + sID + ')', 1);
            return sm2.sounds[sID].stop();
        };
        /**
         * Stops all currently-playing sounds.
         */
        this.stopAll = function() {
            var oSound;
            sm2._wD(sm + '.stopAll()', 1);
            for(oSound in sm2.sounds) {
                if(sm2.sounds.hasOwnProperty(oSound)) {
                    // apply only to sound objects
                    sm2.sounds[oSound].stop();
                }
            }
        };
        /**
         * Calls the pause() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.pause = function(sID) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].pause();
        };
        /**
         * Pauses all currently-playing sounds.
         */
        this.pauseAll = function() {
            var i;
            for(i = sm2.soundIDs.length - 1; i >= 0; i--) {
                sm2.sounds[sm2.soundIDs[i]].pause();
            }
        };
        /**
         * Calls the resume() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.resume = function(sID) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].resume();
        };
        /**
         * Resumes all currently-paused sounds.
         */
        this.resumeAll = function() {
            var i;
            for(i = sm2.soundIDs.length - 1; i >= 0; i--) {
                sm2.sounds[sm2.soundIDs[i]].resume();
            }
        };
        /**
         * Calls the togglePause() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.togglePause = function(sID) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].togglePause();
        };
        /**
         * Calls the setPan() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @param {number} nPan The pan value (-100 to 100)
         * @return {SMSound} The SMSound object
         */
        this.setPan = function(sID, nPan) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].setPan(nPan);
        };
        /**
         * Calls the setVolume() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @param {number} nVol The volume value (0 to 100)
         * @return {SMSound} The SMSound object
         */
        this.setVolume = function(sID, nVol) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].setVolume(nVol);
        };
        /**
         * Calls the mute() method of either a single SMSound object by ID, or all sound objects.
         *
         * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
         */
        this.mute = function(sID) {
            var i = 0;
            if(sID instanceof String) {
                sID = null;
            }
            if(!sID) {
                sm2._wD(sm + '.mute(): Muting all sounds');
                for(i = sm2.soundIDs.length - 1; i >= 0; i--) {
                    sm2.sounds[sm2.soundIDs[i]].mute();
                }
                sm2.muted = true;
            } else {
                if(!idCheck(sID)) {
                    return false;
                }
                sm2._wD(sm + '.mute(): Muting "' + sID + '"');
                return sm2.sounds[sID].mute();
            }
            return true;
        };
        /**
         * Mutes all sounds.
         */
        this.muteAll = function() {
            sm2.mute();
        };
        /**
         * Calls the unmute() method of either a single SMSound object by ID, or all sound objects.
         *
         * @param {string} sID Optional: The ID of the sound (if omitted, all sounds will be used.)
         */
        this.unmute = function(sID) {
            var i;
            if(sID instanceof String) {
                sID = null;
            }
            if(!sID) {
                sm2._wD(sm + '.unmute(): Unmuting all sounds');
                for(i = sm2.soundIDs.length - 1; i >= 0; i--) {
                    sm2.sounds[sm2.soundIDs[i]].unmute();
                }
                sm2.muted = false;
            } else {
                if(!idCheck(sID)) {
                    return false;
                }
                sm2._wD(sm + '.unmute(): Unmuting "' + sID + '"');
                return sm2.sounds[sID].unmute();
            }
            return true;
        };
        /**
         * Unmutes all sounds.
         */
        this.unmuteAll = function() {
            sm2.unmute();
        };
        /**
         * Calls the toggleMute() method of a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.toggleMute = function(sID) {
            if(!idCheck(sID)) {
                return false;
            }
            return sm2.sounds[sID].toggleMute();
        };
        /**
         * Retrieves the memory used by the flash plugin.
         *
         * @return {number} The amount of memory in use
         */
        this.getMemoryUse = function() {
            // flash-only
            var ram = 0;
            if(flash && fV !== 8) {
                ram = parseInt(flash._getMemoryUse(), 10);
            }
            return ram;
        };
        /**
         * Undocumented: NOPs soundManager and all SMSound objects.
         */
        this.disable = function(bNoDisable) {
            // destroy all functions
            var i;
            if(bNoDisable === _undefined) {
                bNoDisable = false;
            }
            if(disabled) {
                return false;
            }
            disabled = true;
            _wDS('shutdown', 1);
            for(i = sm2.soundIDs.length - 1; i >= 0; i--) {
                disableObject(sm2.sounds[sm2.soundIDs[i]]);
            }
            // fire "complete", despite fail
            initComplete(bNoDisable);
            event.remove(window, 'load', initUserOnload);
            return true;
        };
        /**
         * Determines playability of a MIME type, eg. 'audio/mp3'.
         */
        this.canPlayMIME = function(sMIME) {
            var result;
            if(sm2.hasHTML5) {
                result = html5CanPlay({
                    type: sMIME
                });
            }
            if(!result && needsFlash) {
                // if flash 9, test netStream (movieStar) types as well.
                result = (sMIME && sm2.ok() ? !! ((fV > 8 ? sMIME.match(netStreamMimeTypes) : null) || sMIME.match(sm2.mimePattern)) : null); // TODO: make less "weird" (per JSLint)
            }
            return result;
        };
        /**
         * Determines playability of a URL based on audio support.
         *
         * @param {string} sURL The URL to test
         * @return {boolean} URL playability
         */
        this.canPlayURL = function(sURL) {
            var result;
            if(sm2.hasHTML5) {
                result = html5CanPlay({
                    url: sURL
                });
            }
            if(!result && needsFlash) {
                result = (sURL && sm2.ok() ? !! (sURL.match(sm2.filePattern)) : null);
            }
            return result;
        };
        /**
         * Determines playability of an HTML DOM &lt;a&gt; object (or similar object literal) based on audio support.
         *
         * @param {object} oLink an HTML DOM &lt;a&gt; object or object literal including href and/or type attributes
         * @return {boolean} URL playability
         */
        this.canPlayLink = function(oLink) {
            if(oLink.type !== _undefined && oLink.type) {
                if(sm2.canPlayMIME(oLink.type)) {
                    return true;
                }
            }
            return sm2.canPlayURL(oLink.href);
        };
        /**
         * Retrieves a SMSound object by ID.
         *
         * @param {string} sID The ID of the sound
         * @return {SMSound} The SMSound object
         */
        this.getSoundById = function(sID, _suppressDebug) {
            if(!sID) {
                return null;
            }
            var result = sm2.sounds[sID];
            // <d>
            if(!result && !_suppressDebug) {
                sm2._wD(sm + '.getSoundById(): Sound "' + sID + '" not found.', 2);
            }
            // </d>
            return result;
        };
        /**
         * Queues a callback for execution when SoundManager has successfully initialized.
         *
         * @param {function} oMethod The callback method to fire
         * @param {object} oScope Optional: The scope to apply to the callback
         */
        this.onready = function(oMethod, oScope) {
            var sType = 'onready',
                result = false;
            if(typeof oMethod === 'function') {
                // <d>
                if(didInit) {
                    sm2._wD(str('queue', sType));
                }
                // </d>
                if(!oScope) {
                    oScope = window;
                }
                addOnEvent(sType, oMethod, oScope);
                processOnEvents();
                result = true;
            } else {
                throw str('needFunction', sType);
            }
            return result;
        };
        /**
         * Queues a callback for execution when SoundManager has failed to initialize.
         *
         * @param {function} oMethod The callback method to fire
         * @param {object} oScope Optional: The scope to apply to the callback
         */
        this.ontimeout = function(oMethod, oScope) {
            var sType = 'ontimeout',
                result = false;
            if(typeof oMethod === 'function') {
                // <d>
                if(didInit) {
                    sm2._wD(str('queue', sType));
                }
                // </d>
                if(!oScope) {
                    oScope = window;
                }
                addOnEvent(sType, oMethod, oScope);
                processOnEvents({
                    type: sType
                });
                result = true;
            } else {
                throw str('needFunction', sType);
            }
            return result;
        };
        /**
         * Writes console.log()-style debug output to a console or in-browser element.
         * Applies when debugMode = true
         *
         * @param {string} sText The console message
         * @param {object} nType Optional log level (number), or object. Number case: Log type/style where 0 = 'info', 1 = 'warn', 2 = 'error'. Object case: Object to be dumped.
         */
        this._writeDebug = function(sText, sTypeOrObject) {
            // pseudo-private console.log()-style output
            // <d>
            var sDID = 'soundmanager-debug',
                o, oItem;
            if(!sm2.debugMode) {
                return false;
            }
            if(hasConsole && sm2.useConsole) {
                if(sTypeOrObject && typeof sTypeOrObject === 'object') {
                    // object passed; dump to console.
                    console.log(sText, sTypeOrObject);
                } else if(debugLevels[sTypeOrObject] !== _undefined) {
                    console[debugLevels[sTypeOrObject]](sText);
                } else {
                    console.log(sText);
                }
                if(sm2.consoleOnly) {
                    return true;
                }
            }
            o = id(sDID);
            if(!o) {
                return false;
            }
            oItem = doc.createElement('div');
            if(++wdCount % 2 === 0) {
                oItem.className = 'sm2-alt';
            }
            if(sTypeOrObject === _undefined) {
                sTypeOrObject = 0;
            } else {
                sTypeOrObject = parseInt(sTypeOrObject, 10);
            }
            oItem.appendChild(doc.createTextNode(sText));
            if(sTypeOrObject) {
                if(sTypeOrObject >= 2) {
                    oItem.style.fontWeight = 'bold';
                }
                if(sTypeOrObject === 3) {
                    oItem.style.color = '#ff3333';
                }
            }
            // top-to-bottom
            // o.appendChild(oItem);
            // bottom-to-top
            o.insertBefore(oItem, o.firstChild);
            o = null;
            // </d>
            return true;
        };
        // <d>
        // last-resort debugging option
        if(wl.indexOf('sm2-debug=alert') !== -1) {
            this._writeDebug = function(sText) {
                window.alert(sText);
            };
        }
        // </d>
        // alias
        this._wD = this._writeDebug;
        /**
         * Provides debug / state information on all SMSound objects.
         */
        this._debug = function() {
            // <d>
            var i, j;
            _wDS('currentObj', 1);
            for(i = 0, j = sm2.soundIDs.length; i < j; i++) {
                sm2.sounds[sm2.soundIDs[i]]._debug();
            }
            // </d>
        };
        /**
         * Restarts and re-initializes the SoundManager instance.
         *
         * @param {boolean} resetEvents Optional: When true, removes all registered onready and ontimeout event callbacks.
         * @param {boolean} excludeInit Options: When true, does not call beginDelayedInit() (which would restart SM2).
         * @return {object} soundManager The soundManager instance.
         */
        this.reboot = function(resetEvents, excludeInit) {
            // reset some (or all) state, and re-init unless otherwise specified.
            // <d>
            if(sm2.soundIDs.length) {
                sm2._wD('Destroying ' + sm2.soundIDs.length + ' SMSound object' + (sm2.soundIDs.length !== 1 ? 's' : '') + '...');
            }
            // </d>
            var i, j, k;
            for(i = sm2.soundIDs.length - 1; i >= 0; i--) {
                sm2.sounds[sm2.soundIDs[i]].destruct();
            }
            // trash ze flash (remove from the DOM)
            if(flash) {
                try {
                    if(isIE) {
                        oRemovedHTML = flash.innerHTML;
                    }
                    oRemoved = flash.parentNode.removeChild(flash);
                } catch(e) {
                    // Remove failed? May be due to flash blockers silently removing the SWF object/embed node from the DOM. Warn and continue.
                    _wDS('badRemove', 2);
                }
            }
            // actually, force recreate of movie.
            oRemovedHTML = oRemoved = needsFlash = flash = null;
            sm2.enabled = didDCLoaded = didInit = waitingForEI = initPending = didAppend = appendSuccess = disabled = useGlobalHTML5Audio = sm2.swfLoaded = false;
            sm2.soundIDs = [];
            sm2.sounds = {};
            idCounter = 0;
            if(!resetEvents) {
                // reset callbacks for onready, ontimeout etc. so that they will fire again on re-init
                for(i in on_queue) {
                    if(on_queue.hasOwnProperty(i)) {
                        for(j = 0, k = on_queue[i].length; j < k; j++) {
                            on_queue[i][j].fired = false;
                        }
                    }
                }
            } else {
                // remove all callbacks entirely
                on_queue = [];
            }
            // <d>
            if(!excludeInit) {
                sm2._wD(sm + ': Rebooting...');
            }
            // </d>
            // reset HTML5 and flash canPlay test results
            sm2.html5 = {
                'usingFlash': null
            };
            sm2.flash = {};
            // reset device-specific HTML/flash mode switches
            sm2.html5Only = false;
            sm2.ignoreFlash = false;
            window.setTimeout(function() {
                preInit();
                // by default, re-init
                if(!excludeInit) {
                    sm2.beginDelayedInit();
                }
            }, 20);
            return sm2;
        };
        this.reset = function() {
            /**
             * Shuts down and restores the SoundManager instance to its original loaded state, without an explicit reboot. All onready/ontimeout handlers are removed.
             * After this call, SM2 may be re-initialized via soundManager.beginDelayedInit().
             * @return {object} soundManager The soundManager instance.
             */
            _wDS('reset');
            return sm2.reboot(true, true);
        };
        /**
         * Undocumented: Determines the SM2 flash movie's load progress.
         *
         * @return {number or null} Percent loaded, or if invalid/unsupported, null.
         */
        this.getMoviePercent = function() {
            /**
             * Interesting syntax notes...
             * Flash/ExternalInterface (ActiveX/NPAPI) bridge methods are not typeof "function" nor instanceof Function, but are still valid.
             * Additionally, JSLint dislikes ('PercentLoaded' in flash)-style syntax and recommends hasOwnProperty(), which does not work in this case.
             * Furthermore, using (flash && flash.PercentLoaded) causes IE to throw "object doesn't support this property or method".
             * Thus, 'in' syntax must be used.
             */
            return(flash && 'PercentLoaded' in flash ? flash.PercentLoaded() : null); // Yes, JSLint. See nearby comment in source for explanation.
        };
        /**
         * Additional helper for manually invoking SM2's init process after DOM Ready / window.onload().
         */
        this.beginDelayedInit = function() {
            windowLoaded = true;
            domContentLoaded();
            setTimeout(function() {
                if(initPending) {
                    return false;
                }
                createMovie();
                initMovie();
                initPending = true;
                return true;
            }, 20);
            delayWaitForEI();
        };
        /**
         * Destroys the SoundManager instance and all SMSound instances.
         */
        this.destruct = function() {
            sm2._wD(sm + '.destruct()');
            sm2.disable(true);
        };
        /**
         * SMSound() (sound object) constructor
         * ------------------------------------
         *
         * @param {object} oOptions Sound options (id and url are required attributes)
         * @return {SMSound} The new SMSound object
         */
        SMSound = function(oOptions) {
            var s = this,
                resetProperties, add_html5_events, remove_html5_events, stop_html5_timer, start_html5_timer, attachOnPosition, onplay_called = false,
                onPositionItems = [],
                onPositionFired = 0,
                detachOnPosition, applyFromTo, lastURL = null,
                lastHTML5State, urlOmitted;
            lastHTML5State = {
                // tracks duration + position (time)
                duration: null,
                time: null
            };
            this.id = oOptions.id;
            // legacy
            this.sID = this.id;
            this.url = oOptions.url;
            this.options = mixin(oOptions);
            // per-play-instance-specific options
            this.instanceOptions = this.options;
            // short alias
            this._iO = this.instanceOptions;
            // assign property defaults
            this.pan = this.options.pan;
            this.volume = this.options.volume;
            // whether or not this object is using HTML5
            this.isHTML5 = false;
            // internal HTML5 Audio() object reference
            this._a = null;
            // for flash 8 special-case createSound() without url, followed by load/play with url case
            urlOmitted = (this.url ? false : true);
            /**
             * SMSound() public methods
             * ------------------------
             */
            this.id3 = {};
            /**
             * Writes SMSound object parameters to debug console
             */
            this._debug = function() {
                // <d>
                sm2._wD(s.id + ': Merged options:', s.options);
                // </d>
            };
            /**
             * Begins loading a sound per its *url*.
             *
             * @param {object} oOptions Optional: Sound options
             * @return {SMSound} The SMSound object
             */
            this.load = function(oOptions) {
                var oSound = null,
                    instanceOptions;
                if(oOptions !== _undefined) {
                    s._iO = mixin(oOptions, s.options);
                } else {
                    oOptions = s.options;
                    s._iO = oOptions;
                    if(lastURL && lastURL !== s.url) {
                        _wDS('manURL');
                        s._iO.url = s.url;
                        s.url = null;
                    }
                }
                if(!s._iO.url) {
                    s._iO.url = s.url;
                }
                s._iO.url = parseURL(s._iO.url);
                // ensure we're in sync
                s.instanceOptions = s._iO;
                // local shortcut
                instanceOptions = s._iO;
                sm2._wD(s.id + ': load (' + instanceOptions.url + ')');
                if(!instanceOptions.url && !s.url) {
                    sm2._wD(s.id + ': load(): url is unassigned. Exiting.', 2);
                    return s;
                }
                // <d>
                if(!s.isHTML5 && fV === 8 && !s.url && !instanceOptions.autoPlay) {
                    // flash 8 load() -> play() won't work before onload has fired.
                    sm2._wD(s.id + ': Flash 8 load() limitation: Wait for onload() before calling play().', 1);
                }
                // </d>
                if(instanceOptions.url === s.url && s.readyState !== 0 && s.readyState !== 2) {
                    _wDS('onURL', 1);
                    // if loaded and an onload() exists, fire immediately.
                    if(s.readyState === 3 && instanceOptions.onload) {
                        // assume success based on truthy duration.
                        wrapCallback(s, function() {
                            instanceOptions.onload.apply(s, [( !! s.duration)]);
                        });
                    }
                    return s;
                }
                // reset a few state properties
                s.loaded = false;
                s.readyState = 1;
                s.playState = 0;
                s.id3 = {};
                // TODO: If switching from HTML5 -> flash (or vice versa), stop currently-playing audio.
                if(html5OK(instanceOptions)) {
                    oSound = s._setup_html5(instanceOptions);
                    if(!oSound._called_load) {
                        s._html5_canplay = false;
                        // TODO: review called_load / html5_canplay logic
                        // if url provided directly to load(), assign it here.
                        if(s.url !== instanceOptions.url) {
                            sm2._wD(_wDS('manURL') + ': ' + instanceOptions.url);
                            s._a.src = instanceOptions.url;
                            // TODO: review / re-apply all relevant options (volume, loop, onposition etc.)
                            // reset position for new URL
                            s.setPosition(0);
                        }
                        // given explicit load call, try to preload.
                        // early HTML5 implementation (non-standard)
                        s._a.autobuffer = 'auto';
                        // standard property, values: none / metadata / auto
                        // reference: http://msdn.microsoft.com/en-us/library/ie/ff974759%28v=vs.85%29.aspx
                        s._a.preload = 'auto';
                        s._a._called_load = true;
                    } else {
                        sm2._wD(s.id + ': Ignoring request to load again');
                    }
                } else {
                    if(sm2.html5Only) {
                        sm2._wD(s.id + ': No flash support. Exiting.');
                        return s;
                    }
                    if(s._iO.url && s._iO.url.match(/data\:/i)) {
                        // data: URIs not supported by Flash, either.
                        sm2._wD(s.id + ': data: URIs not supported via Flash. Exiting.');
                        return s;
                    }
                    try {
                        s.isHTML5 = false;
                        s._iO = policyFix(loopFix(instanceOptions));
                        // if we have "position", disable auto-play as we'll be seeking to that position at onload().
                        if(s._iO.autoPlay && (s._iO.position || s._iO.from)) {
                            sm2._wD(s.id + ': Disabling autoPlay because of non-zero offset case');
                            s._iO.autoPlay = false;
                        }
                        // re-assign local shortcut
                        instanceOptions = s._iO;
                        if(fV === 8) {
                            flash._load(s.id, instanceOptions.url, instanceOptions.stream, instanceOptions.autoPlay, instanceOptions.usePolicyFile);
                        } else {
                            flash._load(s.id, instanceOptions.url, !! (instanceOptions.stream), !! (instanceOptions.autoPlay), instanceOptions.loops || 1, !! (instanceOptions.autoLoad), instanceOptions.usePolicyFile);
                        }
                    } catch(e) {
                        _wDS('smError', 2);
                        debugTS('onload', false);
                        catchError({
                            type: 'SMSOUND_LOAD_JS_EXCEPTION',
                            fatal: true
                        });
                    }
                }
                // after all of this, ensure sound url is up to date.
                s.url = instanceOptions.url;
                return s;
            };
            /**
             * Unloads a sound, canceling any open HTTP requests.
             *
             * @return {SMSound} The SMSound object
             */
            this.unload = function() {
                // Flash 8/AS2 can't "close" a stream - fake it by loading an empty URL
                // Flash 9/AS3: Close stream, preventing further load
                // HTML5: Most UAs will use empty URL
                if(s.readyState !== 0) {
                    sm2._wD(s.id + ': unload()');
                    if(!s.isHTML5) {
                        if(fV === 8) {
                            flash._unload(s.id, emptyURL);
                        } else {
                            flash._unload(s.id);
                        }
                    } else {
                        stop_html5_timer();
                        if(s._a) {
                            s._a.pause();
                            // update empty URL, too
                            lastURL = html5Unload(s._a);
                        }
                    }
                    // reset load/status flags
                    resetProperties();
                }
                return s;
            };
            /**
             * Unloads and destroys a sound.
             */
            this.destruct = function(_bFromSM) {
                sm2._wD(s.id + ': Destruct');
                if(!s.isHTML5) {
                    // kill sound within Flash
                    // Disable the onfailure handler
                    s._iO.onfailure = null;
                    flash._destroySound(s.id);
                } else {
                    stop_html5_timer();
                    if(s._a) {
                        s._a.pause();
                        html5Unload(s._a);
                        if(!useGlobalHTML5Audio) {
                            remove_html5_events();
                        }
                        // break obvious circular reference
                        s._a._s = null;
                        s._a = null;
                    }
                }
                if(!_bFromSM) {
                    // ensure deletion from controller
                    sm2.destroySound(s.id, true);
                }
            };
            /**
             * Begins playing a sound.
             *
             * @param {object} oOptions Optional: Sound options
             * @return {SMSound} The SMSound object
             */
            this.play = function(oOptions, _updatePlayState) {
                var fN, allowMulti, a, onready,
                    audioClone, onended, oncanplay,
                    startOK = true,
                    exit = null;
                // <d>
                fN = s.id + ': play(): ';
                // </d>
                // default to true
                _updatePlayState = (_updatePlayState === _undefined ? true : _updatePlayState);
                if(!oOptions) {
                    oOptions = {};
                }
                // first, use local URL (if specified)
                if(s.url) {
                    s._iO.url = s.url;
                }
                // mix in any options defined at createSound()
                s._iO = mixin(s._iO, s.options);
                // mix in any options specific to this method
                s._iO = mixin(oOptions, s._iO);
                s._iO.url = parseURL(s._iO.url);
                s.instanceOptions = s._iO;
                // RTMP-only
                if(!s.isHTML5 && s._iO.serverURL && !s.connected) {
                    if(!s.getAutoPlay()) {
                        sm2._wD(fN + ' Netstream not connected yet - setting autoPlay');
                        s.setAutoPlay(true);
                    }
                    // play will be called in onconnect()
                    return s;
                }
                if(html5OK(s._iO)) {
                    s._setup_html5(s._iO);
                    start_html5_timer();
                }
                if(s.playState === 1 && !s.paused) {
                    allowMulti = s._iO.multiShot;
                    if(!allowMulti) {
                        sm2._wD(fN + 'Already playing (one-shot)', 1);
                        if(s.isHTML5) {
                            // go back to original position.
                            s.setPosition(s._iO.position);
                        }
                        exit = s;
                    } else {
                        sm2._wD(fN + 'Already playing (multi-shot)', 1);
                    }
                }
                if(exit !== null) {
                    return exit;
                }
                // edge case: play() with explicit URL parameter
                if(oOptions.url && oOptions.url !== s.url) {
                    // special case for createSound() followed by load() / play() with url; avoid double-load case.
                    if(!s.readyState && !s.isHTML5 && fV === 8 && urlOmitted) {
                        urlOmitted = false;
                    } else {
                        // load using merged options
                        s.load(s._iO);
                    }
                }
                if(!s.loaded) {
                    if(s.readyState === 0) {
                        sm2._wD(fN + 'Attempting to load');
                        // try to get this sound playing ASAP
                        if(!s.isHTML5 && !sm2.html5Only) {
                            // flash: assign directly because setAutoPlay() increments the instanceCount
                            s._iO.autoPlay = true;
                            s.load(s._iO);
                        } else if(s.isHTML5) {
                            // iOS needs this when recycling sounds, loading a new URL on an existing object.
                            s.load(s._iO);
                        } else {
                            sm2._wD(fN + 'Unsupported type. Exiting.');
                            exit = s;
                        }
                        // HTML5 hack - re-set instanceOptions?
                        s.instanceOptions = s._iO;
                    } else if(s.readyState === 2) {
                        sm2._wD(fN + 'Could not load - exiting', 2);
                        exit = s;
                    } else {
                        sm2._wD(fN + 'Loading - attempting to play...');
                    }
                } else {
                    // "play()"
                    sm2._wD(fN.substr(0, fN.lastIndexOf(':')));
                }
                if(exit !== null) {
                    return exit;
                }
                if(!s.isHTML5 && fV === 9 && s.position > 0 && s.position === s.duration) {
                    // flash 9 needs a position reset if play() is called while at the end of a sound.
                    sm2._wD(fN + 'Sound at end, resetting to position:0');
                    oOptions.position = 0;
                }
                /**
                 * Streams will pause when their buffer is full if they are being loaded.
                 * In this case paused is true, but the song hasn't started playing yet.
                 * If we just call resume() the onplay() callback will never be called.
                 * So only call resume() if the position is > 0.
                 * Another reason is because options like volume won't have been applied yet.
                 * For normal sounds, just resume.
                 */
                if(s.paused && s.position >= 0 && (!s._iO.serverURL || s.position > 0)) {
                    // https://gist.github.com/37b17df75cc4d7a90bf6
                    sm2._wD(fN + 'Resuming from paused state', 1);
                    s.resume();
                } else {
                    s._iO = mixin(oOptions, s._iO);
                    /**
                     * Preload in the event of play() with position under Flash,
                     * or from/to parameters and non-RTMP case
                     */
                    if(((!s.isHTML5 && s._iO.position !== null && s._iO.position > 0) || (s._iO.from !== null && s._iO.from > 0) || s._iO.to !== null) && s.instanceCount === 0 && s.playState === 0 && !s._iO.serverURL) {
                        onready = function() {
                            // sound "canplay" or onload()
                            // re-apply position/from/to to instance options, and start playback
                            s._iO = mixin(oOptions, s._iO);
                            s.play(s._iO);
                        };
                        // HTML5 needs to at least have "canplay" fired before seeking.
                        if(s.isHTML5 && !s._html5_canplay) {
                            // this hasn't been loaded yet. load it first, and then do this again.
                            sm2._wD(fN + 'Beginning load for non-zero offset case');
                            s.load({
                                // note: custom HTML5-only event added for from/to implementation.
                                _oncanplay: onready
                            });
                            exit = false;
                        } else if(!s.isHTML5 && !s.loaded && (!s.readyState || s.readyState !== 2)) {
                            // to be safe, preload the whole thing in Flash.
                            sm2._wD(fN + 'Preloading for non-zero offset case');
                            s.load({
                                onload: onready
                            });
                            exit = false;
                        }
                        if(exit !== null) {
                            return exit;
                        }
                        // otherwise, we're ready to go. re-apply local options, and continue
                        s._iO = applyFromTo();
                    }
                    // sm2._wD(fN + 'Starting to play');
                    // increment instance counter, where enabled + supported
                    if(!s.instanceCount || s._iO.multiShotEvents || (s.isHTML5 && s._iO.multiShot && !useGlobalHTML5Audio) || (!s.isHTML5 && fV > 8 && !s.getAutoPlay())) {
                        s.instanceCount++;
                    }
                    // if first play and onposition parameters exist, apply them now
                    if(s._iO.onposition && s.playState === 0) {
                        attachOnPosition(s);
                    }
                    s.playState = 1;
                    s.paused = false;
                    s.position = (s._iO.position !== _undefined && !isNaN(s._iO.position) ? s._iO.position : 0);
                    if(!s.isHTML5) {
                        s._iO = policyFix(loopFix(s._iO));
                    }
                    if(s._iO.onplay && _updatePlayState) {
                        s._iO.onplay.apply(s);
                        onplay_called = true;
                    }
                    s.setVolume(s._iO.volume, true);
                    s.setPan(s._iO.pan, true);
                    if(!s.isHTML5) {
                        startOK = flash._start(s.id, s._iO.loops || 1, (fV === 9 ? s.position : s.position / msecScale), s._iO.multiShot || false);
                        if(fV === 9 && !startOK) {
                            // edge case: no sound hardware, or 32-channel flash ceiling hit.
                            // applies only to Flash 9, non-NetStream/MovieStar sounds.
                            // http://help.adobe.com/en_US/FlashPlatform/reference/actionscript/3/flash/media/Sound.html#play%28%29
                            sm2._wD(fN + 'No sound hardware, or 32-sound ceiling hit', 2);
                            if(s._iO.onplayerror) {
                                s._iO.onplayerror.apply(s);
                            }
                        }
                    } else {
                        if(s.instanceCount < 2) {
                            // HTML5 single-instance case
                            start_html5_timer();
                            a = s._setup_html5();
                            s.setPosition(s._iO.position);
                            a.play();
                        } else {
                            // HTML5 multi-shot case
                            sm2._wD(s.id + ': Cloning Audio() for instance #' + s.instanceCount + '...');
                            audioClone = new Audio(s._iO.url);
                            onended = function() {
                                event.remove(audioClone, 'ended', onended);
                                s._onfinish(s);
                                // cleanup
                                html5Unload(audioClone);
                                audioClone = null;
                            };
                            oncanplay = function() {
                                event.remove(audioClone, 'canplay', oncanplay);
                                try {
                                    audioClone.currentTime = s._iO.position / msecScale;
                                } catch(err) {
                                    complain(s.id + ': multiShot play() failed to apply position of ' + (s._iO.position / msecScale));
                                }
                                audioClone.play();
                            };
                            event.add(audioClone, 'ended', onended);
                            // apply volume to clones, too
                            if(s._iO.volume !== undefined) {
                                audioClone.volume = Math.max(0, Math.min(1, s._iO.volume / 100));
                            }
                            // playing multiple muted sounds? if you do this, you're weird ;) - but let's cover it.
                            if(s.muted) {
                                audioClone.muted = true;
                            }
                            if(s._iO.position) {
                                // HTML5 audio can't seek before onplay() event has fired.
                                // wait for canplay, then seek to position and start playback.
                                event.add(audioClone, 'canplay', oncanplay);
                            } else {
                                // begin playback at currentTime: 0
                                audioClone.play();
                            }
                        }
                    }
                }
                return s;
            };
            // just for convenience
            this.start = this.play;
            /**
             * Stops playing a sound (and optionally, all sounds)
             *
             * @param {boolean} bAll Optional: Whether to stop all sounds
             * @return {SMSound} The SMSound object
             */
            this.stop = function(bAll) {
                var instanceOptions = s._iO,
                    originalPosition;
                if(s.playState === 1) {
                    sm2._wD(s.id + ': stop()');
                    s._onbufferchange(0);
                    s._resetOnPosition(0);
                    s.paused = false;
                    if(!s.isHTML5) {
                        s.playState = 0;
                    }
                    // remove onPosition listeners, if any
                    detachOnPosition();
                    // and "to" position, if set
                    if(instanceOptions.to) {
                        s.clearOnPosition(instanceOptions.to);
                    }
                    if(!s.isHTML5) {
                        flash._stop(s.id, bAll);
                        // hack for netStream: just unload
                        if(instanceOptions.serverURL) {
                            s.unload();
                        }
                    } else {
                        if(s._a) {
                            originalPosition = s.position;
                            // act like Flash, though
                            s.setPosition(0);
                            // hack: reflect old position for onstop() (also like Flash)
                            s.position = originalPosition;
                            // html5 has no stop()
                            // NOTE: pausing means iOS requires interaction to resume.
                            s._a.pause();
                            s.playState = 0;
                            // and update UI
                            s._onTimer();
                            stop_html5_timer();
                        }
                    }
                    s.instanceCount = 0;
                    s._iO = {};
                    if(instanceOptions.onstop) {
                        instanceOptions.onstop.apply(s);
                    }
                }
                return s;
            };
            /**
             * Undocumented/internal: Sets autoPlay for RTMP.
             *
             * @param {boolean} autoPlay state
             */
            this.setAutoPlay = function(autoPlay) {
                sm2._wD(s.id + ': Autoplay turned ' + (autoPlay ? 'on' : 'off'));
                s._iO.autoPlay = autoPlay;
                if(!s.isHTML5) {
                    flash._setAutoPlay(s.id, autoPlay);
                    if(autoPlay) {
                        // only increment the instanceCount if the sound isn't loaded (TODO: verify RTMP)
                        if(!s.instanceCount && s.readyState === 1) {
                            s.instanceCount++;
                            sm2._wD(s.id + ': Incremented instance count to ' + s.instanceCount);
                        }
                    }
                }
            };
            /**
             * Undocumented/internal: Returns the autoPlay boolean.
             *
             * @return {boolean} The current autoPlay value
             */
            this.getAutoPlay = function() {
                return s._iO.autoPlay;
            };
            /**
             * Sets the position of a sound.
             *
             * @param {number} nMsecOffset Position (milliseconds)
             * @return {SMSound} The SMSound object
             */
            this.setPosition = function(nMsecOffset) {
                if(nMsecOffset === _undefined) {
                    nMsecOffset = 0;
                }
                var position, position1K,
                    // Use the duration from the instance options, if we don't have a track duration yet.
                    // position >= 0 and <= current available (loaded) duration
                    offset = (s.isHTML5 ? Math.max(nMsecOffset, 0) : Math.min(s.duration || s._iO.duration, Math.max(nMsecOffset, 0)));
                s.position = offset;
                position1K = s.position / msecScale;
                s._resetOnPosition(s.position);
                s._iO.position = offset;
                if(!s.isHTML5) {
                    position = (fV === 9 ? s.position : position1K);
                    if(s.readyState && s.readyState !== 2) {
                        // if paused or not playing, will not resume (by playing)
                        flash._setPosition(s.id, position, (s.paused || !s.playState), s._iO.multiShot);
                    }
                } else if(s._a) {
                    // Set the position in the canplay handler if the sound is not ready yet
                    if(s._html5_canplay) {
                        if(s._a.currentTime !== position1K) {
                            /**
                             * DOM/JS errors/exceptions to watch out for:
                             * if seek is beyond (loaded?) position, "DOM exception 11"
                             * "INDEX_SIZE_ERR": DOM exception 1
                             */
                            sm2._wD(s.id + ': setPosition(' + position1K + ')');
                            try {
                                s._a.currentTime = position1K;
                                if(s.playState === 0 || s.paused) {
                                    // allow seek without auto-play/resume
                                    s._a.pause();
                                }
                            } catch(e) {
                                sm2._wD(s.id + ': setPosition(' + position1K + ') failed: ' + e.message, 2);
                            }
                        }
                    } else if(position1K) {
                        // warn on non-zero seek attempts
                        sm2._wD(s.id + ': setPosition(' + position1K + '): Cannot seek yet, sound not ready', 2);
                        return s;
                    }
                    if(s.paused) {
                        // if paused, refresh UI right away
                        // force update
                        s._onTimer(true);
                    }
                }
                return s;
            };
            /**
             * Pauses sound playback.
             *
             * @return {SMSound} The SMSound object
             */
            this.pause = function(_bCallFlash) {
                if(s.paused || (s.playState === 0 && s.readyState !== 1)) {
                    return s;
                }
                sm2._wD(s.id + ': pause()');
                s.paused = true;
                if(!s.isHTML5) {
                    if(_bCallFlash || _bCallFlash === _undefined) {
                        flash._pause(s.id, s._iO.multiShot);
                    }
                } else {
                    s._setup_html5().pause();
                    stop_html5_timer();
                }
                if(s._iO.onpause) {
                    s._iO.onpause.apply(s);
                }
                return s;
            };
            /**
             * Resumes sound playback.
             *
             * @return {SMSound} The SMSound object
             */
            /**
             * When auto-loaded streams pause on buffer full they have a playState of 0.
             * We need to make sure that the playState is set to 1 when these streams "resume".
             * When a paused stream is resumed, we need to trigger the onplay() callback if it
             * hasn't been called already. In this case since the sound is being played for the
             * first time, I think it's more appropriate to call onplay() rather than onresume().
             */
            this.resume = function() {
                var instanceOptions = s._iO;
                if(!s.paused) {
                    return s;
                }
                sm2._wD(s.id + ': resume()');
                s.paused = false;
                s.playState = 1;
                if(!s.isHTML5) {
                    if(instanceOptions.isMovieStar && !instanceOptions.serverURL) {
                        // Bizarre Webkit bug (Chrome reported via 8tracks.com dudes): AAC content paused for 30+ seconds(?) will not resume without a reposition.
                        s.setPosition(s.position);
                    }
                    // flash method is toggle-based (pause/resume)
                    flash._pause(s.id, instanceOptions.multiShot);
                } else {
                    s._setup_html5().play();
                    start_html5_timer();
                }
                if(!onplay_called && instanceOptions.onplay) {
                    instanceOptions.onplay.apply(s);
                    onplay_called = true;
                } else if(instanceOptions.onresume) {
                    instanceOptions.onresume.apply(s);
                }
                return s;
            };
            /**
             * Toggles sound playback.
             *
             * @return {SMSound} The SMSound object
             */
            this.togglePause = function() {
                sm2._wD(s.id + ': togglePause()');
                if(s.playState === 0) {
                    s.play({
                        position: (fV === 9 && !s.isHTML5 ? s.position : s.position / msecScale)
                    });
                    return s;
                }
                if(s.paused) {
                    s.resume();
                } else {
                    s.pause();
                }
                return s;
            };
            /**
             * Sets the panning (L-R) effect.
             *
             * @param {number} nPan The pan value (-100 to 100)
             * @return {SMSound} The SMSound object
             */
            this.setPan = function(nPan, bInstanceOnly) {
                if(nPan === _undefined) {
                    nPan = 0;
                }
                if(bInstanceOnly === _undefined) {
                    bInstanceOnly = false;
                }
                if(!s.isHTML5) {
                    flash._setPan(s.id, nPan);
                } // else { no HTML5 pan? }
                s._iO.pan = nPan;
                if(!bInstanceOnly) {
                    s.pan = nPan;
                    s.options.pan = nPan;
                }
                return s;
            };
            /**
             * Sets the volume.
             *
             * @param {number} nVol The volume value (0 to 100)
             * @return {SMSound} The SMSound object
             */
            this.setVolume = function(nVol, _bInstanceOnly) {
                /**
                 * Note: Setting volume has no effect on iOS "special snowflake" devices.
                 * Hardware volume control overrides software, and volume
                 * will always return 1 per Apple docs. (iOS 4 + 5.)
                 * http://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/HTML-canvas-guide/AddingSoundtoCanvasAnimations/AddingSoundtoCanvasAnimations.html
                 */
                if(nVol === _undefined) {
                    nVol = 100;
                }
                if(_bInstanceOnly === _undefined) {
                    _bInstanceOnly = false;
                }
                if(!s.isHTML5) {
                    flash._setVolume(s.id, (sm2.muted && !s.muted) || s.muted ? 0 : nVol);
                } else if(s._a) {
                    if(sm2.muted && !s.muted) {
                        s.muted = true;
                        s._a.muted = true;
                    }
                    // valid range: 0-1
                    s._a.volume = Math.max(0, Math.min(1, nVol / 100));
                }
                s._iO.volume = nVol;
                if(!_bInstanceOnly) {
                    s.volume = nVol;
                    s.options.volume = nVol;
                }
                return s;
            };
            /**
             * Mutes the sound.
             *
             * @return {SMSound} The SMSound object
             */
            this.mute = function() {
                s.muted = true;
                if(!s.isHTML5) {
                    flash._setVolume(s.id, 0);
                } else if(s._a) {
                    s._a.muted = true;
                }
                return s;
            };
            /**
             * Unmutes the sound.
             *
             * @return {SMSound} The SMSound object
             */
            this.unmute = function() {
                s.muted = false;
                var hasIO = (s._iO.volume !== _undefined);
                if(!s.isHTML5) {
                    flash._setVolume(s.id, hasIO ? s._iO.volume : s.options.volume);
                } else if(s._a) {
                    s._a.muted = false;
                }
                return s;
            };
            /**
             * Toggles the muted state of a sound.
             *
             * @return {SMSound} The SMSound object
             */
            this.toggleMute = function() {
                return(s.muted ? s.unmute() : s.mute());
            };
            /**
             * Registers a callback to be fired when a sound reaches a given position during playback.
             *
             * @param {number} nPosition The position to watch for
             * @param {function} oMethod The relevant callback to fire
             * @param {object} oScope Optional: The scope to apply the callback to
             * @return {SMSound} The SMSound object
             */
            this.onPosition = function(nPosition, oMethod, oScope) {
                // TODO: basic dupe checking?
                onPositionItems.push({
                    position: parseInt(nPosition, 10),
                    method: oMethod,
                    scope: (oScope !== _undefined ? oScope : s),
                    fired: false
                });
                return s;
            };
            // legacy/backwards-compability: lower-case method name
            this.onposition = this.onPosition;
            /**
             * Removes registered callback(s) from a sound, by position and/or callback.
             *
             * @param {number} nPosition The position to clear callback(s) for
             * @param {function} oMethod Optional: Identify one callback to be removed when multiple listeners exist for one position
             * @return {SMSound} The SMSound object
             */
            this.clearOnPosition = function(nPosition, oMethod) {
                var i;
                nPosition = parseInt(nPosition, 10);
                if(isNaN(nPosition)) {
                    // safety check
                    return false;
                }
                for(i = 0; i < onPositionItems.length; i++) {
                    if(nPosition === onPositionItems[i].position) {
                        // remove this item if no method was specified, or, if the method matches
                        if(!oMethod || (oMethod === onPositionItems[i].method)) {
                            if(onPositionItems[i].fired) {
                                // decrement "fired" counter, too
                                onPositionFired--;
                            }
                            onPositionItems.splice(i, 1);
                        }
                    }
                }
            };
            this._processOnPosition = function() {
                var i, item, j = onPositionItems.length;
                if(!j || !s.playState || onPositionFired >= j) {
                    return false;
                }
                for(i = j - 1; i >= 0; i--) {
                    item = onPositionItems[i];
                    if(!item.fired && s.position >= item.position) {
                        item.fired = true;
                        onPositionFired++;
                        item.method.apply(item.scope, [item.position]);
                        j = onPositionItems.length; //  reset j -- onPositionItems.length can be changed in the item callback above... occasionally breaking the loop.
                    }
                }
                return true;
            };
            this._resetOnPosition = function(nPosition) {
                // reset "fired" for items interested in this position
                var i, item, j = onPositionItems.length;
                if(!j) {
                    return false;
                }
                for(i = j - 1; i >= 0; i--) {
                    item = onPositionItems[i];
                    if(item.fired && nPosition <= item.position) {
                        item.fired = false;
                        onPositionFired--;
                    }
                }
                return true;
            };
            /**
             * SMSound() private internals
             * --------------------------------
             */
            applyFromTo = function() {
                var instanceOptions = s._iO,
                    f = instanceOptions.from,
                    t = instanceOptions.to,
                    start, end;
                end = function() {
                    // end has been reached.
                    sm2._wD(s.id + ': "To" time of ' + t + ' reached.');
                    // detach listener
                    s.clearOnPosition(t, end);
                    // stop should clear this, too
                    s.stop();
                };
                start = function() {
                    sm2._wD(s.id + ': Playing "from" ' + f);
                    // add listener for end
                    if(t !== null && !isNaN(t)) {
                        s.onPosition(t, end);
                    }
                };
                if(f !== null && !isNaN(f)) {
                    // apply to instance options, guaranteeing correct start position.
                    instanceOptions.position = f;
                    // multiShot timing can't be tracked, so prevent that.
                    instanceOptions.multiShot = false;
                    start();
                }
                // return updated instanceOptions including starting position
                return instanceOptions;
            };
            attachOnPosition = function() {
                var item,
                    op = s._iO.onposition;
                // attach onposition things, if any, now.
                if(op) {
                    for(item in op) {
                        if(op.hasOwnProperty(item)) {
                            s.onPosition(parseInt(item, 10), op[item]);
                        }
                    }
                }
            };
            detachOnPosition = function() {
                var item,
                    op = s._iO.onposition;
                // detach any onposition()-style listeners.
                if(op) {
                    for(item in op) {
                        if(op.hasOwnProperty(item)) {
                            s.clearOnPosition(parseInt(item, 10));
                        }
                    }
                }
            };
            start_html5_timer = function() {
                if(s.isHTML5) {
                    startTimer(s);
                }
            };
            stop_html5_timer = function() {
                if(s.isHTML5) {
                    stopTimer(s);
                }
            };
            resetProperties = function(retainPosition) {
                if(!retainPosition) {
                    onPositionItems = [];
                    onPositionFired = 0;
                }
                onplay_called = false;
                s._hasTimer = null;
                s._a = null;
                s._html5_canplay = false;
                s.bytesLoaded = null;
                s.bytesTotal = null;
                s.duration = (s._iO && s._iO.duration ? s._iO.duration : null);
                s.durationEstimate = null;
                s.buffered = [];
                // legacy: 1D array
                s.eqData = [];
                s.eqData.left = [];
                s.eqData.right = [];
                s.failures = 0;
                s.isBuffering = false;
                s.instanceOptions = {};
                s.instanceCount = 0;
                s.loaded = false;
                s.metadata = {};
                // 0 = uninitialised, 1 = loading, 2 = failed/error, 3 = loaded/success
                s.readyState = 0;
                s.muted = false;
                s.paused = false;
                s.peakData = {
                    left: 0,
                    right: 0
                };
                s.waveformData = {
                    left: [],
                    right: []
                };
                s.playState = 0;
                s.position = null;
                s.id3 = {};
            };
            resetProperties();
            /**
             * Pseudo-private SMSound internals
             * --------------------------------
             */
            this._onTimer = function(bForce) {
                /**
                 * HTML5-only _whileplaying() etc.
                 * called from both HTML5 native events, and polling/interval-based timers
                 * mimics flash and fires only when time/duration change, so as to be polling-friendly
                 */
                var duration, isNew = false,
                    time, x = {};
                if(s._hasTimer || bForce) {
                    // TODO: May not need to track readyState (1 = loading)
                    if(s._a && (bForce || ((s.playState > 0 || s.readyState === 1) && !s.paused))) {
                        duration = s._get_html5_duration();
                        if(duration !== lastHTML5State.duration) {
                            lastHTML5State.duration = duration;
                            s.duration = duration;
                            isNew = true;
                        }
                        // TODO: investigate why this goes wack if not set/re-set each time.
                        s.durationEstimate = s.duration;
                        time = (s._a.currentTime * msecScale || 0);
                        if(time !== lastHTML5State.time) {
                            lastHTML5State.time = time;
                            isNew = true;
                        }
                        if(isNew || bForce) {
                            s._whileplaying(time, x, x, x, x);
                        }
                    }
                    /* else {

          // sm2._wD('_onTimer: Warn for "'+s.id+'": '+(!s._a?'Could not find element. ':'')+(s.playState === 0?'playState bad, 0?':'playState = '+s.playState+', OK'));

          return false;

        }*/
                    return isNew;
                }
            };
            this._get_html5_duration = function() {
                var instanceOptions = s._iO,
                    // if audio object exists, use its duration - else, instance option duration (if provided - it's a hack, really, and should be retired) OR null
                    d = (s._a && s._a.duration ? s._a.duration * msecScale : (instanceOptions && instanceOptions.duration ? instanceOptions.duration : null)),
                    result = (d && !isNaN(d) && d !== Infinity ? d : null);
                return result;
            };
            this._apply_loop = function(a, nLoops) {
                /**
                 * boolean instead of "loop", for webkit? - spec says string. http://www.w3.org/TR/html-markup/audio.html#audio.attrs.loop
                 * note that loop is either off or infinite under HTML5, unlike Flash which allows arbitrary loop counts to be specified.
                 */
                // <d>
                if(!a.loop && nLoops > 1) {
                    sm2._wD('Note: Native HTML5 looping is infinite.', 1);
                }
                // </d>
                a.loop = (nLoops > 1 ? 'loop' : '');
            };
            this._setup_html5 = function(oOptions) {
                var instanceOptions = mixin(s._iO, oOptions),
                    a = useGlobalHTML5Audio ? globalHTML5Audio : s._a,
                    dURL = decodeURI(instanceOptions.url),
                    sameURL;
                /**
                 * "First things first, I, Poppa..." (reset the previous state of the old sound, if playing)
                 * Fixes case with devices that can only play one sound at a time
                 * Otherwise, other sounds in mid-play will be terminated without warning and in a stuck state
                 */
                if(useGlobalHTML5Audio) {
                    if(dURL === decodeURI(lastGlobalHTML5URL)) {
                        // global HTML5 audio: re-use of URL
                        sameURL = true;
                    }
                } else if(dURL === decodeURI(lastURL)) {
                    // options URL is the same as the "last" URL, and we used (loaded) it
                    sameURL = true;
                }
                if(a) {
                    if(a._s) {
                        if(useGlobalHTML5Audio) {
                            if(a._s && a._s.playState && !sameURL) {
                                // global HTML5 audio case, and loading a new URL. stop the currently-playing one.
                                a._s.stop();
                            }
                        } else if(!useGlobalHTML5Audio && dURL === decodeURI(lastURL)) {
                            // non-global HTML5 reuse case: same url, ignore request
                            s._apply_loop(a, instanceOptions.loops);
                            return a;
                        }
                    }
                    if(!sameURL) {
                        // don't retain onPosition() stuff with new URLs.
                        if(lastURL) {
                            resetProperties(false);
                        }
                        // assign new HTML5 URL
                        a.src = instanceOptions.url;
                        s.url = instanceOptions.url;
                        lastURL = instanceOptions.url;
                        lastGlobalHTML5URL = instanceOptions.url;
                        a._called_load = false;
                    }
                } else {
                    if(instanceOptions.autoLoad || instanceOptions.autoPlay) {
                        s._a = new Audio(instanceOptions.url);
                        s._a.load();
                    } else {
                        // null for stupid Opera 9.64 case
                        s._a = (isOpera && opera.version() < 10 ? new Audio(null) : new Audio());
                    }
                    // assign local reference
                    a = s._a;
                    a._called_load = false;
                    if(useGlobalHTML5Audio) {
                        globalHTML5Audio = a;
                    }
                }
                s.isHTML5 = true;
                // store a ref on the track
                s._a = a;
                // store a ref on the audio
                a._s = s;
                add_html5_events();
                s._apply_loop(a, instanceOptions.loops);
                if(instanceOptions.autoLoad || instanceOptions.autoPlay) {
                    s.load();
                } else {
                    // early HTML5 implementation (non-standard)
                    a.autobuffer = false;
                    // standard ('none' is also an option.)
                    a.preload = 'auto';
                }
                return a;
            };
            add_html5_events = function() {
                if(s._a._added_events) {
                    return false;
                }
                var f;

                function add(oEvt, oFn, bCapture) {
                    return s._a ? s._a.addEventListener(oEvt, oFn, bCapture || false) : null;
                }
                s._a._added_events = true;
                for(f in html5_events) {
                    if(html5_events.hasOwnProperty(f)) {
                        add(f, html5_events[f]);
                    }
                }
                return true;
            };
            remove_html5_events = function() {
                // Remove event listeners
                var f;

                function remove(oEvt, oFn, bCapture) {
                    return(s._a ? s._a.removeEventListener(oEvt, oFn, bCapture || false) : null);
                }
                sm2._wD(s.id + ': Removing event listeners');
                s._a._added_events = false;
                for(f in html5_events) {
                    if(html5_events.hasOwnProperty(f)) {
                        remove(f, html5_events[f]);
                    }
                }
            };
            /**
             * Pseudo-private event internals
             * ------------------------------
             */
            this._onload = function(nSuccess) {
                var fN,
                    // check for duration to prevent false positives from flash 8 when loading from cache.
                    loadOK = !! nSuccess || (!s.isHTML5 && fV === 8 && s.duration);
                // <d>
                fN = s.id + ': ';
                sm2._wD(fN + (loadOK ? 'onload()' : 'Failed to load / invalid sound?' + (!s.duration ? ' Zero-length duration reported.' : ' -') + ' (' + s.url + ')'), (loadOK ? 1 : 2));
                if(!loadOK && !s.isHTML5) {
                    if(sm2.sandbox.noRemote === true) {
                        sm2._wD(fN + str('noNet'), 1);
                    }
                    if(sm2.sandbox.noLocal === true) {
                        sm2._wD(fN + str('noLocal'), 1);
                    }
                }
                // </d>
                s.loaded = loadOK;
                s.readyState = loadOK ? 3 : 2;
                s._onbufferchange(0);
                if(s._iO.onload) {
                    wrapCallback(s, function() {
                        s._iO.onload.apply(s, [loadOK]);
                    });
                }
                return true;
            };
            this._onbufferchange = function(nIsBuffering) {
                if(s.playState === 0) {
                    // ignore if not playing
                    return false;
                }
                if((nIsBuffering && s.isBuffering) || (!nIsBuffering && !s.isBuffering)) {
                    return false;
                }
                s.isBuffering = (nIsBuffering === 1);
                if(s._iO.onbufferchange) {
                    sm2._wD(s.id + ': Buffer state change: ' + nIsBuffering);
                    s._iO.onbufferchange.apply(s, [nIsBuffering]);
                }
                return true;
            };
            /**
             * Playback may have stopped due to buffering, or related reason.
             * This state can be encountered on iOS < 6 when auto-play is blocked.
             */
            this._onsuspend = function() {
                if(s._iO.onsuspend) {
                    sm2._wD(s.id + ': Playback suspended');
                    s._iO.onsuspend.apply(s);
                }
                return true;
            };
            /**
             * flash 9/movieStar + RTMP-only method, should fire only once at most
             * at this point we just recreate failed sounds rather than trying to reconnect
             */
            this._onfailure = function(msg, level, code) {
                s.failures++;
                sm2._wD(s.id + ': Failure (' + s.failures + '): ' + msg);
                if(s._iO.onfailure && s.failures === 1) {
                    s._iO.onfailure(msg, level, code);
                } else {
                    sm2._wD(s.id + ': Ignoring failure');
                }
            };
            /**
             * flash 9/movieStar + RTMP-only method for unhandled warnings/exceptions from Flash
             * e.g., RTMP "method missing" warning (non-fatal) for getStreamLength on server
             */
            this._onwarning = function(msg, level, code) {
                if(s._iO.onwarning) {
                    s._iO.onwarning(msg, level, code);
                }
            };
            this._onfinish = function() {
                // store local copy before it gets trashed...
                var io_onfinish = s._iO.onfinish;
                s._onbufferchange(0);
                s._resetOnPosition(0);
                // reset some state items
                if(s.instanceCount) {
                    s.instanceCount--;
                    if(!s.instanceCount) {
                        // remove onPosition listeners, if any
                        detachOnPosition();
                        // reset instance options
                        s.playState = 0;
                        s.paused = false;
                        s.instanceCount = 0;
                        s.instanceOptions = {};
                        s._iO = {};
                        stop_html5_timer();
                        // reset position, too
                        if(s.isHTML5) {
                            s.position = 0;
                        }
                    }
                    if(!s.instanceCount || s._iO.multiShotEvents) {
                        // fire onfinish for last, or every instance
                        if(io_onfinish) {
                            sm2._wD(s.id + ': onfinish()');
                            wrapCallback(s, function() {
                                io_onfinish.apply(s);
                            });
                        }
                    }
                }
            };
            this._whileloading = function(nBytesLoaded, nBytesTotal, nDuration, nBufferLength) {
                var instanceOptions = s._iO;
                s.bytesLoaded = nBytesLoaded;
                s.bytesTotal = nBytesTotal;
                s.duration = Math.floor(nDuration);
                s.bufferLength = nBufferLength;
                if(!s.isHTML5 && !instanceOptions.isMovieStar) {
                    if(instanceOptions.duration) {
                        // use duration from options, if specified and larger. nobody should be specifying duration in options, actually, and it should be retired.
                        s.durationEstimate = (s.duration > instanceOptions.duration) ? s.duration : instanceOptions.duration;
                    } else {
                        s.durationEstimate = parseInt((s.bytesTotal / s.bytesLoaded) * s.duration, 10);
                    }
                } else {
                    s.durationEstimate = s.duration;
                }
                // for flash, reflect sequential-load-style buffering
                if(!s.isHTML5) {
                    s.buffered = [{
                        'start': 0,
                        'end': s.duration
                    }];
                }
                // allow whileloading to fire even if "load" fired under HTML5, due to HTTP range/partials
                if((s.readyState !== 3 || s.isHTML5) && instanceOptions.whileloading) {
                    instanceOptions.whileloading.apply(s);
                }
            };
            this._whileplaying = function(nPosition, oPeakData, oWaveformDataLeft, oWaveformDataRight, oEQData) {
                var instanceOptions = s._iO,
                    eqLeft;
                if(isNaN(nPosition) || nPosition === null) {
                    // flash safety net
                    return false;
                }
                // Safari HTML5 play() may return small -ve values when starting from position: 0, eg. -50.120396875. Unexpected/invalid per W3, I think. Normalize to 0.
                s.position = Math.max(0, nPosition);
                s._processOnPosition();
                if(!s.isHTML5 && fV > 8) {
                    if(instanceOptions.usePeakData && oPeakData !== _undefined && oPeakData) {
                        s.peakData = {
                            left: oPeakData.leftPeak,
                            right: oPeakData.rightPeak
                        };
                    }
                    if(instanceOptions.useWaveformData && oWaveformDataLeft !== _undefined && oWaveformDataLeft) {
                        s.waveformData = {
                            left: oWaveformDataLeft.split(','),
                            right: oWaveformDataRight.split(',')
                        };
                    }
                    if(instanceOptions.useEQData) {
                        if(oEQData !== _undefined && oEQData && oEQData.leftEQ) {
                            eqLeft = oEQData.leftEQ.split(',');
                            s.eqData = eqLeft;
                            s.eqData.left = eqLeft;
                            if(oEQData.rightEQ !== _undefined && oEQData.rightEQ) {
                                s.eqData.right = oEQData.rightEQ.split(',');
                            }
                        }
                    }
                }
                if(s.playState === 1) {
                    // special case/hack: ensure buffering is false if loading from cache (and not yet started)
                    if(!s.isHTML5 && fV === 8 && !s.position && s.isBuffering) {
                        s._onbufferchange(0);
                    }
                    if(instanceOptions.whileplaying) {
                        // flash may call after actual finish
                        instanceOptions.whileplaying.apply(s);
                    }
                }
                return true;
            };
            this._oncaptiondata = function(oData) {
                /**
                 * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
                 *
                 * @param {object} oData
                 */
                sm2._wD(s.id + ': Caption data received.');
                s.captiondata = oData;
                if(s._iO.oncaptiondata) {
                    s._iO.oncaptiondata.apply(s, [oData]);
                }
            };
            this._onmetadata = function(oMDProps, oMDData) {
                /**
                 * internal: flash 9 + NetStream (MovieStar/RTMP-only) feature
                 * RTMP may include song title, MovieStar content may include encoding info
                 *
                 * @param {array} oMDProps (names)
                 * @param {array} oMDData (values)
                 */
                sm2._wD(s.id + ': Metadata received.');
                var oData = {}, i, j;
                for(i = 0, j = oMDProps.length; i < j; i++) {
                    oData[oMDProps[i]] = oMDData[i];
                }
                s.metadata = oData;
                console.log('updated metadata', s.metadata);
                if(s._iO.onmetadata) {
                    s._iO.onmetadata.call(s, s.metadata);
                }
            };
            this._onid3 = function(oID3Props, oID3Data) {
                /**
                 * internal: flash 8 + flash 9 ID3 feature
                 * may include artist, song title etc.
                 *
                 * @param {array} oID3Props (names)
                 * @param {array} oID3Data (values)
                 */
                sm2._wD(s.id + ': ID3 data received.');
                var oData = [],
                    i, j;
                for(i = 0, j = oID3Props.length; i < j; i++) {
                    oData[oID3Props[i]] = oID3Data[i];
                }
                s.id3 = mixin(s.id3, oData);
                if(s._iO.onid3) {
                    s._iO.onid3.apply(s);
                }
            };
            // flash/RTMP-only
            this._onconnect = function(bSuccess) {
                bSuccess = (bSuccess === 1);
                sm2._wD(s.id + ': ' + (bSuccess ? 'Connected.' : 'Failed to connect? - ' + s.url), (bSuccess ? 1 : 2));
                s.connected = bSuccess;
                if(bSuccess) {
                    s.failures = 0;
                    if(idCheck(s.id)) {
                        if(s.getAutoPlay()) {
                            // only update the play state if auto playing
                            s.play(_undefined, s.getAutoPlay());
                        } else if(s._iO.autoLoad) {
                            s.load();
                        }
                    }
                    if(s._iO.onconnect) {
                        s._iO.onconnect.apply(s, [bSuccess]);
                    }
                }
            };
            this._ondataerror = function(sError) {
                // flash 9 wave/eq data handler
                // hack: called at start, and end from flash at/after onfinish()
                if(s.playState > 0) {
                    sm2._wD(s.id + ': Data error: ' + sError);
                    if(s._iO.ondataerror) {
                        s._iO.ondataerror.apply(s);
                    }
                }
            };
            // <d>
            this._debug();
            // </d>
        }; // SMSound()
        /**
         * Private SoundManager internals
         * ------------------------------
         */
        getDocument = function() {
            return(doc.body || doc.getElementsByTagName('div')[0]);
        };
        id = function(sID) {
            return doc.getElementById(sID);
        };
        mixin = function(oMain, oAdd) {
            // non-destructive merge
            var o1 = (oMain || {}),
                o2, o;
            // if unspecified, o2 is the default options object
            o2 = (oAdd === _undefined ? sm2.defaultOptions : oAdd);
            for(o in o2) {
                if(o2.hasOwnProperty(o) && o1[o] === _undefined) {
                    if(typeof o2[o] !== 'object' || o2[o] === null) {
                        // assign directly
                        o1[o] = o2[o];
                    } else {
                        // recurse through o2
                        o1[o] = mixin(o1[o], o2[o]);
                    }
                }
            }
            return o1;
        };
        wrapCallback = function(oSound, callback) {
            /**
             * 03/03/2013: Fix for Flash Player 11.6.602.171 + Flash 8 (flashVersion = 8) SWF issue
             * setTimeout() fix for certain SMSound callbacks like onload() and onfinish(), where subsequent calls like play() and load() fail when Flash Player 11.6.602.171 is installed, and using soundManager with flashVersion = 8 (which is the default).
             * Not sure of exact cause. Suspect race condition and/or invalid (NaN-style) position argument trickling down to the next JS -> Flash _start() call, in the play() case.
             * Fix: setTimeout() to yield, plus safer null / NaN checking on position argument provided to Flash.
             * https://getsatisfaction.com/schillmania/topics/recent_chrome_update_seems_to_have_broken_my_sm2_audio_player
             */
            if(!oSound.isHTML5 && fV === 8) {
                window.setTimeout(callback, 0);
            } else {
                callback();
            }
        };
        // additional soundManager properties that soundManager.setup() will accept
        extraOptions = {
            'onready': 1,
            'ontimeout': 1,
            'defaultOptions': 1,
            'flash9Options': 1,
            'movieStarOptions': 1
        };
        assign = function(o, oParent) {
            /**
             * recursive assignment of properties, soundManager.setup() helper
             * allows property assignment based on whitelist
             */
            var i,
                result = true,
                hasParent = (oParent !== _undefined),
                setupOptions = sm2.setupOptions,
                bonusOptions = extraOptions;
            // <d>
            // if soundManager.setup() called, show accepted parameters.
            if(o === _undefined) {
                result = [];
                for(i in setupOptions) {
                    if(setupOptions.hasOwnProperty(i)) {
                        result.push(i);
                    }
                }
                for(i in bonusOptions) {
                    if(bonusOptions.hasOwnProperty(i)) {
                        if(typeof sm2[i] === 'object') {
                            result.push(i + ': {...}');
                        } else if(sm2[i] instanceof Function) {
                            result.push(i + ': function() {...}');
                        } else {
                            result.push(i);
                        }
                    }
                }
                sm2._wD(str('setup', result.join(', ')));
                return false;
            }
            // </d>
            for(i in o) {
                if(o.hasOwnProperty(i)) {
                    // if not an {object} we want to recurse through...
                    if(typeof o[i] !== 'object' || o[i] === null || o[i] instanceof Array || o[i] instanceof RegExp) {
                        // check "allowed" options
                        if(hasParent && bonusOptions[oParent] !== _undefined) {
                            // valid recursive / nested object option, eg., { defaultOptions: { volume: 50 } }
                            sm2[oParent][i] = o[i];
                        } else if(setupOptions[i] !== _undefined) {
                            // special case: assign to setupOptions object, which soundManager property references
                            sm2.setupOptions[i] = o[i];
                            // assign directly to soundManager, too
                            sm2[i] = o[i];
                        } else if(bonusOptions[i] === _undefined) {
                            // invalid or disallowed parameter. complain.
                            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);
                            result = false;
                        } else {
                            /**
                             * valid extraOptions (bonusOptions) parameter.
                             * is it a method, like onready/ontimeout? call it.
                             * multiple parameters should be in an array, eg. soundManager.setup({onready: [myHandler, myScope]});
                             */
                            if(sm2[i] instanceof Function) {
                                sm2[i].apply(sm2, (o[i] instanceof Array ? o[i] : [o[i]]));
                            } else {
                                // good old-fashioned direct assignment
                                sm2[i] = o[i];
                            }
                        }
                    } else {
                        // recursion case, eg., { defaultOptions: { ... } }
                        if(bonusOptions[i] === _undefined) {
                            // invalid or disallowed parameter. complain.
                            complain(str((sm2[i] === _undefined ? 'setupUndef' : 'setupError'), i), 2);
                            result = false;
                        } else {
                            // recurse through object
                            return assign(o[i], i);
                        }
                    }
                }
            }
            return result;
        };

        function preferFlashCheck(kind) {
            // whether flash should play a given type
            return(sm2.preferFlash && hasFlash && !sm2.ignoreFlash && (sm2.flash[kind] !== _undefined && sm2.flash[kind]));
        }
        /**
         * Internal DOM2-level event helpers
         * ---------------------------------
         */
        event = (function() {
            // normalize event methods
            var old = (window.attachEvent),
                evt = {
                    add: (old ? 'attachEvent' : 'addEventListener'),
                    remove: (old ? 'detachEvent' : 'removeEventListener')
                };
            // normalize "on" event prefix, optional capture argument

            function getArgs(oArgs) {
                var args = slice.call(oArgs),
                    len = args.length;
                if(old) {
                    // prefix
                    args[1] = 'on' + args[1];
                    if(len > 3) {
                        // no capture
                        args.pop();
                    }
                } else if(len === 3) {
                    args.push(false);
                }
                return args;
            }

            function apply(args, sType) {
                // normalize and call the event method, with the proper arguments
                var element = args.shift(),
                    method = [evt[sType]];
                if(old) {
                    // old IE can't do apply().
                    element[method](args[0], args[1]);
                } else {
                    element[method].apply(element, args);
                }
            }

            function add() {
                apply(getArgs(arguments), 'add');
            }

            function remove() {
                apply(getArgs(arguments), 'remove');
            }
            return {
                'add': add,
                'remove': remove
            };
        }());
        /**
         * Internal HTML5 event handling
         * -----------------------------
         */

        function html5_event(oFn) {
            // wrap html5 event handlers so we don't call them on destroyed and/or unloaded sounds
            return function(e) {
                var s = this._s,
                    result;
                if(!s || !s._a) {
                    // <d>
                    if(s && s.id) {
                        sm2._wD(s.id + ': Ignoring ' + e.type);
                    } else {
                        sm2._wD(h5 + 'Ignoring ' + e.type);
                    }
                    // </d>
                    result = null;
                } else {
                    result = oFn.call(this, e);
                }
                return result;
            };
        }
        html5_events = {
            // HTML5 event-name-to-handler map
            abort: html5_event(function() {
                sm2._wD(this._s.id + ': abort');
            }),
            // enough has loaded to play
            canplay: html5_event(function() {
                var s = this._s,
                    position1K;
                if(s._html5_canplay) {
                    // this event has already fired. ignore.
                    return true;
                }
                s._html5_canplay = true;
                sm2._wD(s.id + ': canplay');
                s._onbufferchange(0);
                // position according to instance options
                position1K = (s._iO.position !== _undefined && !isNaN(s._iO.position) ? s._iO.position / msecScale : null);
                // set the position if position was provided before the sound loaded
                if(this.currentTime !== position1K) {
                    sm2._wD(s.id + ': canplay: Setting position to ' + position1K);
                    try {
                        this.currentTime = position1K;
                    } catch(ee) {
                        sm2._wD(s.id + ': canplay: Setting position of ' + position1K + ' failed: ' + ee.message, 2);
                    }
                }
                // hack for HTML5 from/to case
                if(s._iO._oncanplay) {
                    s._iO._oncanplay();
                }
            }),
            canplaythrough: html5_event(function() {
                var s = this._s;
                if(!s.loaded) {
                    s._onbufferchange(0);
                    s._whileloading(s.bytesLoaded, s.bytesTotal, s._get_html5_duration());
                    s._onload(true);
                }
            }),
            durationchange: html5_event(function() {
                // durationchange may fire at various times, probably the safest way to capture accurate/final duration.
                var s = this._s,
                    duration;
                duration = s._get_html5_duration();
                if(!isNaN(duration) && duration !== s.duration) {
                    sm2._wD(this._s.id + ': durationchange (' + duration + ')' + (s.duration ? ', previously ' + s.duration : ''));
                    s.durationEstimate = s.duration = duration;
                }
            }),
            // TODO: Reserved for potential use
            /*
    emptied: html5_event(function() {

      sm2._wD(this._s.id + ': emptied');

    }),
    */
            ended: html5_event(function() {
                var s = this._s;
                sm2._wD(s.id + ': ended');
                s._onfinish();
            }),
            error: html5_event(function() {
                sm2._wD(this._s.id + ': HTML5 error, code ' + this.error.code);
                /**
                 * HTML5 error codes, per W3C
                 * Error 1: Client aborted download at user's request.
                 * Error 2: Network error after load started.
                 * Error 3: Decoding issue.
                 * Error 4: Media (audio file) not supported.
                 * Reference: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-video-element.html#error-codes
                 */
                // call load with error state?
                this._s._onload(false);
            }),
            loadeddata: html5_event(function() {
                var s = this._s;
                sm2._wD(s.id + ': loadeddata');
                // safari seems to nicely report progress events, eventually totalling 100%
                if(!s._loaded && !isSafari) {
                    s.duration = s._get_html5_duration();
                }
            }),
            loadedmetadata: html5_event(function() {
                sm2._wD(this._s.id + ': loadedmetadata');
            }),
            loadstart: html5_event(function() {
                sm2._wD(this._s.id + ': loadstart');
                // assume buffering at first
                this._s._onbufferchange(1);
            }),
            play: html5_event(function() {
                // sm2._wD(this._s.id + ': play()');
                // once play starts, no buffering
                this._s._onbufferchange(0);
            }),
            playing: html5_event(function() {
                sm2._wD(this._s.id + ': playing ' + String.fromCharCode(9835));
                // once play starts, no buffering
                this._s._onbufferchange(0);
            }),
            progress: html5_event(function(e) {
                // note: can fire repeatedly after "loaded" event, due to use of HTTP range/partials
                var s = this._s,
                    i, j, progStr, buffered = 0,
                    isProgress = (e.type === 'progress'),
                    ranges = e.target.buffered,
                    // firefox 3.6 implements e.loaded/total (bytes)
                    loaded = (e.loaded || 0),
                    total = (e.total || 1);
                // reset the "buffered" (loaded byte ranges) array
                s.buffered = [];
                if(ranges && ranges.length) {
                    // if loaded is 0, try TimeRanges implementation as % of load
                    // https://developer.mozilla.org/en/DOM/TimeRanges
                    // re-build "buffered" array
                    // HTML5 returns seconds. SM2 API uses msec for setPosition() etc., whether Flash or HTML5.
                    for(i = 0, j = ranges.length; i < j; i++) {
                        s.buffered.push({
                            'start': ranges.start(i) * msecScale,
                            'end': ranges.end(i) * msecScale
                        });
                    }
                    // use the last value locally
                    buffered = (ranges.end(0) - ranges.start(0)) * msecScale;
                    // linear case, buffer sum; does not account for seeking and HTTP partials / byte ranges
                    loaded = Math.min(1, buffered / (e.target.duration * msecScale));
                    // <d>
                    if(isProgress && ranges.length > 1) {
                        progStr = [];
                        j = ranges.length;
                        for(i = 0; i < j; i++) {
                            progStr.push(e.target.buffered.start(i) * msecScale + '-' + e.target.buffered.end(i) * msecScale);
                        }
                        sm2._wD(this._s.id + ': progress, timeRanges: ' + progStr.join(', '));
                    }
                    if(isProgress && !isNaN(loaded)) {
                        sm2._wD(this._s.id + ': progress, ' + Math.floor(loaded * 100) + '% loaded');
                    }
                    // </d>
                }
                if(!isNaN(loaded)) {
                    // TODO: prevent calls with duplicate values.
                    s._whileloading(loaded, total, s._get_html5_duration());
                    if(loaded && total && loaded === total) {
                        // in case "onload" doesn't fire (eg. gecko 1.9.2)
                        html5_events.canplaythrough.call(this, e);
                    }
                }
            }),
            ratechange: html5_event(function() {
                sm2._wD(this._s.id + ': ratechange');
            }),
            suspend: html5_event(function(e) {
                // download paused/stopped, may have finished (eg. onload)
                var s = this._s;
                sm2._wD(this._s.id + ': suspend');
                html5_events.progress.call(this, e);
                s._onsuspend();
            }),
            stalled: html5_event(function() {
                sm2._wD(this._s.id + ': stalled');
            }),
            timeupdate: html5_event(function() {
                this._s._onTimer();
            }),
            waiting: html5_event(function() {
                var s = this._s;
                // see also: seeking
                sm2._wD(this._s.id + ': waiting');
                // playback faster than download rate, etc.
                s._onbufferchange(1);
            })
        };
        html5OK = function(iO) {
            // playability test based on URL or MIME type
            var result;
            if(!iO || (!iO.type && !iO.url && !iO.serverURL)) {
                // nothing to check
                result = false;
            } else if(iO.serverURL || (iO.type && preferFlashCheck(iO.type))) {
                // RTMP, or preferring flash
                result = false;
            } else {
                // Use type, if specified. Pass data: URIs to HTML5. If HTML5-only mode, no other options, so just give 'er
                result = ((iO.type ? html5CanPlay({
                    type: iO.type
                }) : html5CanPlay({
                    url: iO.url
                }) || sm2.html5Only || iO.url.match(/data\:/i)));
            }
            return result;
        };
        html5Unload = function(oAudio) {
            /**
             * Internal method: Unload media, and cancel any current/pending network requests.
             * Firefox can load an empty URL, which allegedly destroys the decoder and stops the download.
             * https://developer.mozilla.org/En/Using_audio_and_video_in_Firefox#Stopping_the_download_of_media
             * However, Firefox has been seen loading a relative URL from '' and thus requesting the hosting page on unload.
             * Other UA behaviour is unclear, so everyone else gets an about:blank-style URL.
             */
            var url;
            if(oAudio) {
                // Firefox and Chrome accept short WAVe data: URIs. Chome dislikes audio/wav, but accepts audio/wav for data: MIME.
                // Desktop Safari complains / fails on data: URI, so it gets about:blank.
                url = (isSafari ? emptyURL : (sm2.html5.canPlayType('audio/wav') ? emptyWAV : emptyURL));
                oAudio.src = url;
                // reset some state, too
                if(oAudio._called_unload !== undefined) {
                    oAudio._called_load = false;
                }
            }
            if(useGlobalHTML5Audio) {
                // ensure URL state is trashed, also
                lastGlobalHTML5URL = null;
            }
            return url;
        };
        html5CanPlay = function(o) {
            /**
             * Try to find MIME, test and return truthiness
             * o = {
             *  url: '/path/to/an.mp3',
             *  type: 'audio/mp3'
             * }
             */
            if(!sm2.useHTML5Audio || !sm2.hasHTML5) {
                return false;
            }
            var url = (o.url || null),
                mime = (o.type || null),
                aF = sm2.audioFormats,
                result,
                offset,
                fileExt,
                item;
            // account for known cases like audio/mp3
            if(mime && sm2.html5[mime] !== _undefined) {
                return(sm2.html5[mime] && !preferFlashCheck(mime));
            }
            if(!html5Ext) {
                html5Ext = [];
                for(item in aF) {
                    if(aF.hasOwnProperty(item)) {
                        html5Ext.push(item);
                        if(aF[item].related) {
                            html5Ext = html5Ext.concat(aF[item].related);
                        }
                    }
                }
                html5Ext = new RegExp('\\.(' + html5Ext.join('|') + ')(\\?.*)?$', 'i');
            }
            // TODO: Strip URL queries, etc.
            fileExt = (url ? url.toLowerCase().match(html5Ext) : null);
            if(!fileExt || !fileExt.length) {
                if(!mime) {
                    result = false;
                } else {
                    // audio/mp3 -> mp3, result should be known
                    offset = mime.indexOf(';');
                    // strip "audio/X; codecs..."
                    fileExt = (offset !== -1 ? mime.substr(0, offset) : mime).substr(6);
                }
            } else {
                // match the raw extension name - "mp3", for example
                fileExt = fileExt[1];
            }
            if(fileExt && sm2.html5[fileExt] !== _undefined) {
                // result known
                result = (sm2.html5[fileExt] && !preferFlashCheck(fileExt));
            } else {
                mime = 'audio/' + fileExt;
                result = sm2.html5.canPlayType({
                    type: mime
                });
                sm2.html5[fileExt] = result;
                // sm2._wD('canPlayType, found result: ' + result);
                result = (result && sm2.html5[mime] && !preferFlashCheck(mime));
            }
            return result;
        };
        testHTML5 = function() {
            /**
             * Internal: Iterates over audioFormats, determining support eg. audio/mp3, audio/mpeg and so on
             * assigns results to html5[] and flash[].
             */
            if(!sm2.useHTML5Audio || !sm2.hasHTML5) {
                // without HTML5, we need Flash.
                sm2.html5.usingFlash = true;
                needsFlash = true;
                return false;
            }
            // double-whammy: Opera 9.64 throws WRONG_ARGUMENTS_ERR if no parameter passed to Audio(), and Webkit + iOS happily tries to load "null" as a URL. :/
            var a = (Audio !== _undefined ? (isOpera && opera.version() < 10 ? new Audio(null) : new Audio()) : null),
                item, lookup, support = {}, aF, i;

            function cp(m) {
                var canPlay, j,
                    result = false,
                    isOK = false;
                if(!a || typeof a.canPlayType !== 'function') {
                    return result;
                }
                if(m instanceof Array) {
                    // iterate through all mime types, return any successes
                    for(i = 0, j = m.length; i < j; i++) {
                        if(sm2.html5[m[i]] || a.canPlayType(m[i]).match(sm2.html5Test)) {
                            isOK = true;
                            sm2.html5[m[i]] = true;
                            // note flash support, too
                            sm2.flash[m[i]] = !! (m[i].match(flashMIME));
                        }
                    }
                    result = isOK;
                } else {
                    canPlay = (a && typeof a.canPlayType === 'function' ? a.canPlayType(m) : false);
                    result = !! (canPlay && (canPlay.match(sm2.html5Test)));
                }
                return result;
            }
            // test all registered formats + codecs
            aF = sm2.audioFormats;
            for(item in aF) {
                if(aF.hasOwnProperty(item)) {
                    lookup = 'audio/' + item;
                    support[item] = cp(aF[item].type);
                    // write back generic type too, eg. audio/mp3
                    support[lookup] = support[item];
                    // assign flash
                    if(item.match(flashMIME)) {
                        sm2.flash[item] = true;
                        sm2.flash[lookup] = true;
                    } else {
                        sm2.flash[item] = false;
                        sm2.flash[lookup] = false;
                    }
                    // assign result to related formats, too
                    if(aF[item] && aF[item].related) {
                        for(i = aF[item].related.length - 1; i >= 0; i--) {
                            // eg. audio/m4a
                            support['audio/' + aF[item].related[i]] = support[item];
                            sm2.html5[aF[item].related[i]] = support[item];
                            sm2.flash[aF[item].related[i]] = support[item];
                        }
                    }
                }
            }
            support.canPlayType = (a ? cp : null);
            sm2.html5 = mixin(sm2.html5, support);
            sm2.html5.usingFlash = featureCheck();
            needsFlash = sm2.html5.usingFlash;
            return true;
        };
        strings = {
            // <d>
            notReady: 'Unavailable - wait until onready() has fired.',
            notOK: 'Audio support is not available.',
            domError: sm + 'exception caught while appending SWF to DOM.',
            spcWmode: 'Removing wmode, preventing known SWF loading issue(s)',
            swf404: smc + 'Verify that %s is a valid path.',
            tryDebug: 'Try ' + sm + '.debugFlash = true for more security details (output goes to SWF.)',
            checkSWF: 'See SWF output for more debug info.',
            localFail: smc + 'Non-HTTP page (' + doc.location.protocol + ' URL?) Review Flash player security settings for this special case:\nhttp://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html\nMay need to add/allow path, eg. c:/sm2/ or /users/me/sm2/',
            waitFocus: smc + 'Special case: Waiting for SWF to load with window focus...',
            waitForever: smc + 'Waiting indefinitely for Flash (will recover if unblocked)...',
            waitSWF: smc + 'Waiting for 100% SWF load...',
            needFunction: smc + 'Function object expected for %s',
            badID: 'Sound ID "%s" should be a string, starting with a non-numeric character',
            currentObj: smc + '_debug(): Current sound objects',
            waitOnload: smc + 'Waiting for window.onload()',
            docLoaded: smc + 'Document already loaded',
            onload: smc + 'initComplete(): calling soundManager.onload()',
            onloadOK: sm + '.onload() complete',
            didInit: smc + 'init(): Already called?',
            secNote: 'Flash security note: Network/internet URLs will not load due to security restrictions. Access can be configured via Flash Player Global Security Settings Page: http://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager04.html',
            badRemove: smc + 'Failed to remove Flash node.',
            shutdown: sm + '.disable(): Shutting down',
            queue: smc + 'Queueing %s handler',
            smError: 'SMSound.load(): Exception: JS-Flash communication failed, or JS error.',
            fbTimeout: 'No flash response, applying .' + swfCSS.swfTimedout + ' CSS...',
            fbLoaded: 'Flash loaded',
            fbHandler: smc + 'flashBlockHandler()',
            manURL: 'SMSound.load(): Using manually-assigned URL',
            onURL: sm + '.load(): current URL already assigned.',
            badFV: sm + '.flashVersion must be 8 or 9. "%s" is invalid. Reverting to %s.',
            as2loop: 'Note: Setting stream:false so looping can work (flash 8 limitation)',
            noNSLoop: 'Note: Looping not implemented for MovieStar formats',
            needfl9: 'Note: Switching to flash 9, required for MP4 formats.',
            mfTimeout: 'Setting flashLoadTimeout = 0 (infinite) for off-screen, mobile flash case',
            needFlash: smc + 'Fatal error: Flash is needed to play some required formats, but is not available.',
            gotFocus: smc + 'Got window focus.',
            policy: 'Enabling usePolicyFile for data access',
            setup: sm + '.setup(): allowed parameters: %s',
            setupError: sm + '.setup(): "%s" cannot be assigned with this method.',
            setupUndef: sm + '.setup(): Could not find option "%s"',
            setupLate: sm + '.setup(): url, flashVersion and html5Test property changes will not take effect until reboot().',
            noURL: smc + 'Flash URL required. Call soundManager.setup({url:...}) to get started.',
            sm2Loaded: 'SoundManager 2: Ready. ' + String.fromCharCode(10003),
            reset: sm + '.reset(): Removing event callbacks',
            mobileUA: 'Mobile UA detected, preferring HTML5 by default.',
            globalHTML5: 'Using singleton HTML5 Audio() pattern for this device.'
            // </d>
        };
        str = function() {
            // internal string replace helper.
            // arguments: o [,items to replace]
            // <d>
            var args,
                i, j, o,
                sstr;
            // real array, please
            args = slice.call(arguments);
            // first argument
            o = args.shift();
            sstr = (strings && strings[o] ? strings[o] : '');
            if(sstr && args && args.length) {
                for(i = 0, j = args.length; i < j; i++) {
                    sstr = sstr.replace('%s', args[i]);
                }
            }
            return sstr;
            // </d>
        };
        loopFix = function(sOpt) {
            // flash 8 requires stream = false for looping to work
            if(fV === 8 && sOpt.loops > 1 && sOpt.stream) {
                _wDS('as2loop');
                sOpt.stream = false;
            }
            return sOpt;
        };
        policyFix = function(sOpt, sPre) {
            if(sOpt && !sOpt.usePolicyFile && (sOpt.onid3 || sOpt.usePeakData || sOpt.useWaveformData || sOpt.useEQData)) {
                sm2._wD((sPre || '') + str('policy'));
                sOpt.usePolicyFile = true;
            }
            return sOpt;
        };
        complain = function(sMsg) {
            // <d>
            if(hasConsole && console.warn !== _undefined) {
                console.warn(sMsg);
            } else {
                sm2._wD(sMsg);
            }
            // </d>
        };
        doNothing = function() {
            return false;
        };
        disableObject = function(o) {
            var oProp;
            for(oProp in o) {
                if(o.hasOwnProperty(oProp) && typeof o[oProp] === 'function') {
                    o[oProp] = doNothing;
                }
            }
            oProp = null;
        };
        failSafely = function(bNoDisable) {
            // general failure exception handler
            if(bNoDisable === _undefined) {
                bNoDisable = false;
            }
            if(disabled || bNoDisable) {
                sm2.disable(bNoDisable);
            }
        };
        normalizeMovieURL = function(smURL) {
            var urlParams = null,
                url;
            if(smURL) {
                if(smURL.match(/\.swf(\?.*)?$/i)) {
                    urlParams = smURL.substr(smURL.toLowerCase().lastIndexOf('.swf?') + 4);
                    if(urlParams) {
                        // assume user knows what they're doing
                        return smURL;
                    }
                } else if(smURL.lastIndexOf('/') !== smURL.length - 1) {
                    // append trailing slash, if needed
                    smURL += '/';
                }
            }
            url = (smURL && smURL.lastIndexOf('/') !== -1 ? smURL.substr(0, smURL.lastIndexOf('/') + 1) : './') + sm2.movieURL;
            if(sm2.noSWFCache) {
                url += ('?ts=' + new Date().getTime());
            }
            return url;
        };
        setVersionInfo = function() {
            // short-hand for internal use
            fV = parseInt(sm2.flashVersion, 10);
            if(fV !== 8 && fV !== 9) {
                sm2._wD(str('badFV', fV, defaultFlashVersion));
                sm2.flashVersion = fV = defaultFlashVersion;
            }
            // debug flash movie, if applicable
            var isDebug = (sm2.debugMode || sm2.debugFlash ? '_debug.swf' : '.swf');
            if(sm2.useHTML5Audio && !sm2.html5Only && sm2.audioFormats.mp4.required && fV < 9) {
                sm2._wD(str('needfl9'));
                sm2.flashVersion = fV = 9;
            }
            sm2.version = sm2.versionNumber + (sm2.html5Only ? ' (HTML5-only mode)' : (fV === 9 ? ' (AS3/Flash 9)' : ' (AS2/Flash 8)'));
            // set up default options
            if(fV > 8) {
                // +flash 9 base options
                sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.flash9Options);
                sm2.features.buffering = true;
                // +moviestar support
                sm2.defaultOptions = mixin(sm2.defaultOptions, sm2.movieStarOptions);
                sm2.filePatterns.flash9 = new RegExp('\\.(mp3|' + netStreamTypes.join('|') + ')(\\?.*)?$', 'i');
                sm2.features.movieStar = true;
            } else {
                sm2.features.movieStar = false;
            }
            // regExp for flash canPlay(), etc.
            sm2.filePattern = sm2.filePatterns[(fV !== 8 ? 'flash9' : 'flash8')];
            // if applicable, use _debug versions of SWFs
            sm2.movieURL = (fV === 8 ? 'soundmanager2.swf' : 'soundmanager2_flash9.swf').replace('.swf', isDebug);
            sm2.features.peakData = sm2.features.waveformData = sm2.features.eqData = (fV > 8);
        };
        setPolling = function(bPolling, bHighPerformance) {
            if(!flash) {
                return false;
            }
            flash._setPolling(bPolling, bHighPerformance);
        };
        initDebug = function() {
            // starts debug mode, creating output <div> for UAs without console object
            // allow force of debug mode via URL
            // <d>
            if(sm2.debugURLParam.test(wl)) {
                sm2.debugMode = true;
            }
            if(id(sm2.debugID)) {
                return false;
            }
            var oD, oDebug, oTarget, oToggle, tmp;
            if(sm2.debugMode && !id(sm2.debugID) && (!hasConsole || !sm2.useConsole || !sm2.consoleOnly)) {
                oD = doc.createElement('div');
                oD.id = sm2.debugID + '-toggle';
                oToggle = {
                    'position': 'fixed',
                    'bottom': '0px',
                    'right': '0px',
                    'width': '1.2em',
                    'height': '1.2em',
                    'lineHeight': '1.2em',
                    'margin': '2px',
                    'textAlign': 'center',
                    'border': '1px solid #999',
                    'cursor': 'pointer',
                    'background': '#fff',
                    'color': '#333',
                    'zIndex': 10001
                };
                oD.appendChild(doc.createTextNode('-'));
                oD.onclick = toggleDebug;
                oD.title = 'Toggle SM2 debug console';
                if(ua.match(/msie 6/i)) {
                    oD.style.position = 'absolute';
                    oD.style.cursor = 'hand';
                }
                for(tmp in oToggle) {
                    if(oToggle.hasOwnProperty(tmp)) {
                        oD.style[tmp] = oToggle[tmp];
                    }
                }
                oDebug = doc.createElement('div');
                oDebug.id = sm2.debugID;
                oDebug.style.display = (sm2.debugMode ? 'block' : 'none');
                if(sm2.debugMode && !id(oD.id)) {
                    try {
                        oTarget = getDocument();
                        oTarget.appendChild(oD);
                    } catch(e2) {
                        throw new Error(str('domError') + ' \n' + e2.toString());
                    }
                    oTarget.appendChild(oDebug);
                }
            }
            oTarget = null;
            // </d>
        };
        idCheck = this.getSoundById;
        // <d>
        _wDS = function(o, errorLevel) {
            return(!o ? '' : sm2._wD(str(o), errorLevel));
        };
        toggleDebug = function() {
            var o = id(sm2.debugID),
                oT = id(sm2.debugID + '-toggle');
            if(!o) {
                return false;
            }
            if(debugOpen) {
                // minimize
                oT.innerHTML = '+';
                o.style.display = 'none';
            } else {
                oT.innerHTML = '-';
                o.style.display = 'block';
            }
            debugOpen = !debugOpen;
        };
        debugTS = function(sEventType, bSuccess, sMessage) {
            // troubleshooter debug hooks
            if(window.sm2Debugger !== _undefined) {
                try {
                    sm2Debugger.handleEvent(sEventType, bSuccess, sMessage);
                } catch(e) {
                    // oh well
                    return false;
                }
            }
            return true;
        };
        // </d>
        getSWFCSS = function() {
            var css = [];
            if(sm2.debugMode) {
                css.push(swfCSS.sm2Debug);
            }
            if(sm2.debugFlash) {
                css.push(swfCSS.flashDebug);
            }
            if(sm2.useHighPerformance) {
                css.push(swfCSS.highPerf);
            }
            return css.join(' ');
        };
        flashBlockHandler = function() {
            // *possible* flash block situation.
            var name = str('fbHandler'),
                p = sm2.getMoviePercent(),
                css = swfCSS,
                error = {
                    type: 'FLASHBLOCK'
                };
            if(sm2.html5Only) {
                // no flash, or unused
                return false;
            }
            if(!sm2.ok()) {
                if(needsFlash) {
                    // make the movie more visible, so user can fix
                    sm2.oMC.className = getSWFCSS() + ' ' + css.swfDefault + ' ' + (p === null ? css.swfTimedout : css.swfError);
                    sm2._wD(name + ': ' + str('fbTimeout') + (p ? ' (' + str('fbLoaded') + ')' : ''));
                }
                sm2.didFlashBlock = true;
                // fire onready(), complain lightly
                processOnEvents({
                    type: 'ontimeout',
                    ignoreInit: true,
                    error: error
                });
                catchError(error);
            } else {
                // SM2 loaded OK (or recovered)
                // <d>
                if(sm2.didFlashBlock) {
                    sm2._wD(name + ': Unblocked');
                }
                // </d>
                if(sm2.oMC) {
                    sm2.oMC.className = [getSWFCSS(), css.swfDefault, css.swfLoaded + (sm2.didFlashBlock ? ' ' + css.swfUnblocked : '')].join(' ');
                }
            }
        };
        addOnEvent = function(sType, oMethod, oScope) {
            if(on_queue[sType] === _undefined) {
                on_queue[sType] = [];
            }
            on_queue[sType].push({
                'method': oMethod,
                'scope': (oScope || null),
                'fired': false
            });
        };
        processOnEvents = function(oOptions) {
            // if unspecified, assume OK/error
            if(!oOptions) {
                oOptions = {
                    type: (sm2.ok() ? 'onready' : 'ontimeout')
                };
            }
            if(!didInit && oOptions && !oOptions.ignoreInit) {
                // not ready yet.
                return false;
            }
            if(oOptions.type === 'ontimeout' && (sm2.ok() || (disabled && !oOptions.ignoreInit))) {
                // invalid case
                return false;
            }
            var status = {
                success: (oOptions && oOptions.ignoreInit ? sm2.ok() : !disabled)
            },
                // queue specified by type, or none
                srcQueue = (oOptions && oOptions.type ? on_queue[oOptions.type] || [] : []),
                queue = [],
                i, j,
                args = [status],
                canRetry = (needsFlash && !sm2.ok());
            if(oOptions.error) {
                args[0].error = oOptions.error;
            }
            for(i = 0, j = srcQueue.length; i < j; i++) {
                if(srcQueue[i].fired !== true) {
                    queue.push(srcQueue[i]);
                }
            }
            if(queue.length) {
                // sm2._wD(sm + ': Firing ' + queue.length + ' ' + oOptions.type + '() item' + (queue.length === 1 ? '' : 's'));
                for(i = 0, j = queue.length; i < j; i++) {
                    if(queue[i].scope) {
                        queue[i].method.apply(queue[i].scope, args);
                    } else {
                        queue[i].method.apply(this, args);
                    }
                    if(!canRetry) {
                        // useFlashBlock and SWF timeout case doesn't count here.
                        queue[i].fired = true;
                    }
                }
            }
            return true;
        };
        initUserOnload = function() {
            window.setTimeout(function() {
                if(sm2.useFlashBlock) {
                    flashBlockHandler();
                }
                processOnEvents();
                // call user-defined "onload", scoped to window
                if(typeof sm2.onload === 'function') {
                    _wDS('onload', 1);
                    sm2.onload.apply(window);
                    _wDS('onloadOK', 1);
                }
                if(sm2.waitForWindowLoad) {
                    event.add(window, 'load', initUserOnload);
                }
            }, 1);
        };
        detectFlash = function() {
            // hat tip: Flash Detect library (BSD, (C) 2007) by Carl "DocYes" S. Yestrau - http://featureblend.com/javascript-flash-detection-library.html / http://featureblend.com/license.txt
            if(hasFlash !== _undefined) {
                // this work has already been done.
                return hasFlash;
            }
            var hasPlugin = false,
                n = navigator,
                nP = n.plugins,
                obj, type, types, AX = window.ActiveXObject;
            if(nP && nP.length) {
                type = 'application/x-shockwave-flash';
                types = n.mimeTypes;
                if(types && types[type] && types[type].enabledPlugin && types[type].enabledPlugin.description) {
                    hasPlugin = true;
                }
            } else if(AX !== _undefined && !ua.match(/MSAppHost/i)) {
                // Windows 8 Store Apps (MSAppHost) are weird (compatibility?) and won't complain here, but will barf if Flash/ActiveX object is appended to the DOM.
                try {
                    obj = new AX('ShockwaveFlash.ShockwaveFlash');
                } catch(e) {
                    // oh well
                    obj = null;
                }
                hasPlugin = ( !! obj);
                // cleanup, because it is ActiveX after all
                obj = null;
            }
            hasFlash = hasPlugin;
            return hasPlugin;
        };
        featureCheck = function() {
            var flashNeeded,
                item,
                formats = sm2.audioFormats,
                // iPhone <= 3.1 has broken HTML5 audio(), but firmware 3.2 (original iPad) + iOS4 works.
                isSpecial = (is_iDevice && !! (ua.match(/os (1|2|3_0|3_1)\s/i)));
            if(isSpecial) {
                // has Audio(), but is broken; let it load links directly.
                sm2.hasHTML5 = false;
                // ignore flash case, however
                sm2.html5Only = true;
                // hide the SWF, if present
                if(sm2.oMC) {
                    sm2.oMC.style.display = 'none';
                }
            } else {
                if(sm2.useHTML5Audio) {
                    if(!sm2.html5 || !sm2.html5.canPlayType) {
                        sm2._wD('SoundManager: No HTML5 Audio() support detected.');
                        sm2.hasHTML5 = false;
                    }
                    // <d>
                    if(isBadSafari) {
                        sm2._wD(smc + 'Note: Buggy HTML5 Audio in Safari on this OS X release, see https://bugs.webkit.org/show_bug.cgi?id=32159 - ' + (!hasFlash ? ' would use flash fallback for MP3/MP4, but none detected.' : 'will use flash fallback for MP3/MP4, if available'), 1);
                    }
                    // </d>
                }
            }
            if(sm2.useHTML5Audio && sm2.hasHTML5) {
                // sort out whether flash is optional, required or can be ignored.
                // innocent until proven guilty.
                canIgnoreFlash = true;
                for(item in formats) {
                    if(formats.hasOwnProperty(item)) {
                        if(formats[item].required) {
                            if(!sm2.html5.canPlayType(formats[item].type)) {
                                // 100% HTML5 mode is not possible.
                                canIgnoreFlash = false;
                                flashNeeded = true;
                            } else if(sm2.preferFlash && (sm2.flash[item] || sm2.flash[formats[item].type])) {
                                // flash may be required, or preferred for this format.
                                flashNeeded = true;
                            }
                        }
                    }
                }
            }
            // sanity check...
            if(sm2.ignoreFlash) {
                flashNeeded = false;
                canIgnoreFlash = true;
            }
            sm2.html5Only = (sm2.hasHTML5 && sm2.useHTML5Audio && !flashNeeded);
            return(!sm2.html5Only);
        };
        parseURL = function(url) {
            /**
             * Internal: Finds and returns the first playable URL (or failing that, the first URL.)
             * @param {string or array} url A single URL string, OR, an array of URL strings or {url:'/path/to/resource', type:'audio/mp3'} objects.
             */
            var i, j, urlResult = 0,
                result;
            if(url instanceof Array) {
                // find the first good one
                for(i = 0, j = url.length; i < j; i++) {
                    if(url[i] instanceof Object) {
                        // MIME check
                        if(sm2.canPlayMIME(url[i].type)) {
                            urlResult = i;
                            break;
                        }
                    } else if(sm2.canPlayURL(url[i])) {
                        // URL string check
                        urlResult = i;
                        break;
                    }
                }
                // normalize to string
                if(url[urlResult].url) {
                    url[urlResult] = url[urlResult].url;
                }
                result = url[urlResult];
            } else {
                // single URL case
                result = url;
            }
            return result;
        };
        startTimer = function(oSound) {
            /**
             * attach a timer to this sound, and start an interval if needed
             */
            if(!oSound._hasTimer) {
                oSound._hasTimer = true;
                if(!mobileHTML5 && sm2.html5PollingInterval) {
                    if(h5IntervalTimer === null && h5TimerCount === 0) {
                        h5IntervalTimer = setInterval(timerExecute, sm2.html5PollingInterval);
                    }
                    h5TimerCount++;
                }
            }
        };
        stopTimer = function(oSound) {
            /**
             * detach a timer
             */
            if(oSound._hasTimer) {
                oSound._hasTimer = false;
                if(!mobileHTML5 && sm2.html5PollingInterval) {
                    // interval will stop itself at next execution.
                    h5TimerCount--;
                }
            }
        };
        timerExecute = function() {
            /**
             * manual polling for HTML5 progress events, ie., whileplaying() (can achieve greater precision than conservative default HTML5 interval)
             */
            var i;
            if(h5IntervalTimer !== null && !h5TimerCount) {
                // no active timers, stop polling interval.
                clearInterval(h5IntervalTimer);
                h5IntervalTimer = null;
                return false;
            }
            // check all HTML5 sounds with timers
            for(i = sm2.soundIDs.length - 1; i >= 0; i--) {
                if(sm2.sounds[sm2.soundIDs[i]].isHTML5 && sm2.sounds[sm2.soundIDs[i]]._hasTimer) {
                    sm2.sounds[sm2.soundIDs[i]]._onTimer();
                }
            }
        };
        catchError = function(options) {
            options = (options !== _undefined ? options : {});
            if(typeof sm2.onerror === 'function') {
                sm2.onerror.apply(window, [{
                    type: (options.type !== _undefined ? options.type : null)
                }]);
            }
            if(options.fatal !== _undefined && options.fatal) {
                sm2.disable();
            }
        };
        badSafariFix = function() {
            // special case: "bad" Safari (OS X 10.3 - 10.7) must fall back to flash for MP3/MP4
            if(!isBadSafari || !detectFlash()) {
                // doesn't apply
                return false;
            }
            var aF = sm2.audioFormats,
                i, item;
            for(item in aF) {
                if(aF.hasOwnProperty(item)) {
                    if(item === 'mp3' || item === 'mp4') {
                        sm2._wD(sm + ': Using flash fallback for ' + item + ' format');
                        sm2.html5[item] = false;
                        // assign result to related formats, too
                        if(aF[item] && aF[item].related) {
                            for(i = aF[item].related.length - 1; i >= 0; i--) {
                                sm2.html5[aF[item].related[i]] = false;
                            }
                        }
                    }
                }
            }
        };
        /**
         * Pseudo-private flash/ExternalInterface methods
         * ----------------------------------------------
         */
        this._setSandboxType = function(sandboxType) {
            // <d>
            var sb = sm2.sandbox;
            sb.type = sandboxType;
            sb.description = sb.types[(sb.types[sandboxType] !== _undefined ? sandboxType : 'unknown')];
            if(sb.type === 'localWithFile') {
                sb.noRemote = true;
                sb.noLocal = false;
                _wDS('secNote', 2);
            } else if(sb.type === 'localWithNetwork') {
                sb.noRemote = false;
                sb.noLocal = true;
            } else if(sb.type === 'localTrusted') {
                sb.noRemote = false;
                sb.noLocal = false;
            }
            // </d>
        };
        this._externalInterfaceOK = function(swfVersion) {
            // flash callback confirming flash loaded, EI working etc.
            // swfVersion: SWF build string
            if(sm2.swfLoaded) {
                return false;
            }
            var e;
            debugTS('swf', true);
            debugTS('flashtojs', true);
            sm2.swfLoaded = true;
            tryInitOnFocus = false;
            if(isBadSafari) {
                badSafariFix();
            }
            // complain if JS + SWF build/version strings don't match, excluding +DEV builds
            // <d>
            if(!swfVersion || swfVersion.replace(/\+dev/i, '') !== sm2.versionNumber.replace(/\+dev/i, '')) {
                e = sm + ': Fatal: JavaScript file build "' + sm2.versionNumber + '" does not match Flash SWF build "' + swfVersion + '" at ' + sm2.url + '. Ensure both are up-to-date.';
                // escape flash -> JS stack so this error fires in window.
                setTimeout(function versionMismatch() {
                    throw new Error(e);
                }, 0);
                // exit, init will fail with timeout
                return false;
            }
            // </d>
            // IE needs a larger timeout
            setTimeout(init, isIE ? 100 : 1);
        };
        /**
         * Private initialization helpers
         * ------------------------------
         */
        createMovie = function(smID, smURL) {
            if(didAppend && appendSuccess) {
                // ignore if already succeeded
                return false;
            }

            function initMsg() {
                // <d>
                var options = [],
                    title,
                    msg = [],
                    delimiter = ' + ';
                title = 'SoundManager ' + sm2.version + (!sm2.html5Only && sm2.useHTML5Audio ? (sm2.hasHTML5 ? ' + HTML5 audio' : ', no HTML5 audio support') : '');
                if(!sm2.html5Only) {
                    if(sm2.preferFlash) {
                        options.push('preferFlash');
                    }
                    if(sm2.useHighPerformance) {
                        options.push('useHighPerformance');
                    }
                    if(sm2.flashPollingInterval) {
                        options.push('flashPollingInterval (' + sm2.flashPollingInterval + 'ms)');
                    }
                    if(sm2.html5PollingInterval) {
                        options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
                    }
                    if(sm2.wmode) {
                        options.push('wmode (' + sm2.wmode + ')');
                    }
                    if(sm2.debugFlash) {
                        options.push('debugFlash');
                    }
                    if(sm2.useFlashBlock) {
                        options.push('flashBlock');
                    }
                } else {
                    if(sm2.html5PollingInterval) {
                        options.push('html5PollingInterval (' + sm2.html5PollingInterval + 'ms)');
                    }
                }
                if(options.length) {
                    msg = msg.concat([options.join(delimiter)]);
                }
                sm2._wD(title + (msg.length ? delimiter + msg.join(', ') : ''), 1);
                showSupport();
                // </d>
            }
            if(sm2.html5Only) {
                // 100% HTML5 mode
                setVersionInfo();
                initMsg();
                sm2.oMC = id(sm2.movieID);
                init();
                // prevent multiple init attempts
                didAppend = true;
                appendSuccess = true;
                return false;
            }
            // flash path
            var remoteURL = (smURL || sm2.url),
                localURL = (sm2.altURL || remoteURL),
                swfTitle = 'JS/Flash audio component (SoundManager 2)',
                oTarget = getDocument(),
                extraClass = getSWFCSS(),
                isRTL = null,
                html = doc.getElementsByTagName('html')[0],
                oEmbed, oMovie, tmp, movieHTML, oEl, s, x, sClass;
            isRTL = (html && html.dir && html.dir.match(/rtl/i));
            smID = (smID === _undefined ? sm2.id : smID);

            function param(name, value) {
                return '<param name="' + name + '" value="' + value + '" />';
            }
            // safety check for legacy (change to Flash 9 URL)
            setVersionInfo();
            sm2.url = normalizeMovieURL(overHTTP ? remoteURL : localURL);
            smURL = sm2.url;
            sm2.wmode = (!sm2.wmode && sm2.useHighPerformance ? 'transparent' : sm2.wmode);
            if(sm2.wmode !== null && (ua.match(/msie 8/i) || (!isIE && !sm2.useHighPerformance)) && navigator.platform.match(/win32|win64/i)) {
                /**
                 * extra-special case: movie doesn't load until scrolled into view when using wmode = anything but 'window' here
                 * does not apply when using high performance (position:fixed means on-screen), OR infinite flash load timeout
                 * wmode breaks IE 8 on Vista + Win7 too in some cases, as of January 2011 (?)
                 */
                messages.push(strings.spcWmode);
                sm2.wmode = null;
            }
            oEmbed = {
                'name': smID,
                'id': smID,
                'src': smURL,
                'quality': 'high',
                'allowScriptAccess': sm2.allowScriptAccess,
                'bgcolor': sm2.bgColor,
                'pluginspage': http + 'www.macromedia.com/go/getflashplayer',
                'title': swfTitle,
                'type': 'application/x-shockwave-flash',
                'wmode': sm2.wmode,
                // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
                'hasPriority': 'true'
            };
            if(sm2.debugFlash) {
                oEmbed.FlashVars = 'debug=1';
            }
            if(!sm2.wmode) {
                // don't write empty attribute
                delete oEmbed.wmode;
            }
            if(isIE) {
                // IE is "special".
                oMovie = doc.createElement('div');
                movieHTML = ['<object id="' + smID + '" data="' + smURL + '" type="' + oEmbed.type + '" title="' + oEmbed.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + http + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">',
                    param('movie', smURL),
                    param('AllowScriptAccess', sm2.allowScriptAccess),
                    param('quality', oEmbed.quality), (sm2.wmode ? param('wmode', sm2.wmode) : ''),
                    param('bgcolor', sm2.bgColor),
                    param('hasPriority', 'true'), (sm2.debugFlash ? param('FlashVars', oEmbed.FlashVars) : ''), '</object>'
                ].join('');
            } else {
                oMovie = doc.createElement('embed');
                for(tmp in oEmbed) {
                    if(oEmbed.hasOwnProperty(tmp)) {
                        oMovie.setAttribute(tmp, oEmbed[tmp]);
                    }
                }
            }
            initDebug();
            extraClass = getSWFCSS();
            oTarget = getDocument();
            if(oTarget) {
                sm2.oMC = (id(sm2.movieID) || doc.createElement('div'));
                if(!sm2.oMC.id) {
                    sm2.oMC.id = sm2.movieID;
                    sm2.oMC.className = swfCSS.swfDefault + ' ' + extraClass;
                    s = null;
                    oEl = null;
                    if(!sm2.useFlashBlock) {
                        if(sm2.useHighPerformance) {
                            // on-screen at all times
                            s = {
                                'position': 'fixed',
                                'width': '8px',
                                'height': '8px',
                                // >= 6px for flash to run fast, >= 8px to start up under Firefox/win32 in some cases. odd? yes.
                                'bottom': '0px',
                                'left': '0px',
                                'overflow': 'hidden'
                            };
                        } else {
                            // hide off-screen, lower priority
                            s = {
                                'position': 'absolute',
                                'width': '6px',
                                'height': '6px',
                                'top': '-9999px',
                                'left': '-9999px'
                            };
                            if(isRTL) {
                                s.left = Math.abs(parseInt(s.left, 10)) + 'px';
                            }
                        }
                    }
                    if(isWebkit) {
                        // soundcloud-reported render/crash fix, safari 5
                        sm2.oMC.style.zIndex = 10000;
                    }
                    if(!sm2.debugFlash) {
                        for(x in s) {
                            if(s.hasOwnProperty(x)) {
                                sm2.oMC.style[x] = s[x];
                            }
                        }
                    }
                    try {
                        if(!isIE) {
                            sm2.oMC.appendChild(oMovie);
                        }
                        oTarget.appendChild(sm2.oMC);
                        if(isIE) {
                            oEl = sm2.oMC.appendChild(doc.createElement('div'));
                            oEl.className = swfCSS.swfBox;
                            oEl.innerHTML = movieHTML;
                        }
                        appendSuccess = true;
                    } catch(e) {
                        throw new Error(str('domError') + ' \n' + e.toString());
                    }
                } else {
                    // SM2 container is already in the document (eg. flashblock use case)
                    sClass = sm2.oMC.className;
                    sm2.oMC.className = (sClass ? sClass + ' ' : swfCSS.swfDefault) + (extraClass ? ' ' + extraClass : '');
                    sm2.oMC.appendChild(oMovie);
                    if(isIE) {
                        oEl = sm2.oMC.appendChild(doc.createElement('div'));
                        oEl.className = swfCSS.swfBox;
                        oEl.innerHTML = movieHTML;
                    }
                    appendSuccess = true;
                }
            }
            didAppend = true;
            initMsg();
            // sm2._wD(sm + ': Trying to load ' + smURL + (!overHTTP && sm2.altURL ? ' (alternate URL)' : ''), 1);
            return true;
        };
        initMovie = function() {
            if(sm2.html5Only) {
                createMovie();
                return false;
            }
            // attempt to get, or create, movie (may already exist)
            if(flash) {
                return false;
            }
            if(!sm2.url) {
                /**
                 * Something isn't right - we've reached init, but the soundManager url property has not been set.
                 * User has not called setup({url: ...}), or has not set soundManager.url (legacy use case) directly before init time.
                 * Notify and exit. If user calls setup() with a url: property, init will be restarted as in the deferred loading case.
                 */
                _wDS('noURL');
                return false;
            }
            // inline markup case
            flash = sm2.getMovie(sm2.id);
            if(!flash) {
                if(!oRemoved) {
                    // try to create
                    createMovie(sm2.id, sm2.url);
                } else {
                    // try to re-append removed movie after reboot()
                    if(!isIE) {
                        sm2.oMC.appendChild(oRemoved);
                    } else {
                        sm2.oMC.innerHTML = oRemovedHTML;
                    }
                    oRemoved = null;
                    didAppend = true;
                }
                flash = sm2.getMovie(sm2.id);
            }
            if(typeof sm2.oninitmovie === 'function') {
                setTimeout(sm2.oninitmovie, 1);
            }
            // <d>
            flushMessages();
            // </d>
            return true;
        };
        delayWaitForEI = function() {
            setTimeout(waitForEI, 1000);
        };
        rebootIntoHTML5 = function() {
            // special case: try for a reboot with preferFlash: false, if 100% HTML5 mode is possible and useFlashBlock is not enabled.
            window.setTimeout(function() {
                complain(smc + 'useFlashBlock is false, 100% HTML5 mode is possible. Rebooting with preferFlash: false...');
                sm2.setup({
                    preferFlash: false
                }).reboot();
                // if for some reason you want to detect this case, use an ontimeout() callback and look for html5Only and didFlashBlock == true.
                sm2.didFlashBlock = true;
                sm2.beginDelayedInit();
            }, 1);
        };
        waitForEI = function() {
            var p,
                loadIncomplete = false;
            if(!sm2.url) {
                // No SWF url to load (noURL case) - exit for now. Will be retried when url is set.
                return false;
            }
            if(waitingForEI) {
                return false;
            }
            waitingForEI = true;
            event.remove(window, 'load', delayWaitForEI);
            if(hasFlash && tryInitOnFocus && !isFocused) {
                // Safari won't load flash in background tabs, only when focused.
                _wDS('waitFocus');
                return false;
            }
            if(!didInit) {
                p = sm2.getMoviePercent();
                if(p > 0 && p < 100) {
                    loadIncomplete = true;
                }
            }
            setTimeout(function() {
                p = sm2.getMoviePercent();
                if(loadIncomplete) {
                    // special case: if movie *partially* loaded, retry until it's 100% before assuming failure.
                    waitingForEI = false;
                    sm2._wD(str('waitSWF'));
                    window.setTimeout(delayWaitForEI, 1);
                    return false;
                }
                // <d>
                if(!didInit) {
                    sm2._wD(sm + ': No Flash response within expected time. Likely causes: ' + (p === 0 ? 'SWF load failed, ' : '') + 'Flash blocked or JS-Flash security error.' + (sm2.debugFlash ? ' ' + str('checkSWF') : ''), 2);
                    if(!overHTTP && p) {
                        _wDS('localFail', 2);
                        if(!sm2.debugFlash) {
                            _wDS('tryDebug', 2);
                        }
                    }
                    if(p === 0) {
                        // if 0 (not null), probably a 404.
                        sm2._wD(str('swf404', sm2.url), 1);
                    }
                    debugTS('flashtojs', false, ': Timed out' + overHTTP ? ' (Check flash security or flash blockers)' : ' (No plugin/missing SWF?)');
                }
                // </d>
                // give up / time-out, depending
                if(!didInit && okToDisable) {
                    if(p === null) {
                        // SWF failed to report load progress. Possibly blocked.
                        if(sm2.useFlashBlock || sm2.flashLoadTimeout === 0) {
                            if(sm2.useFlashBlock) {
                                flashBlockHandler();
                            }
                            _wDS('waitForever');
                        } else {
                            // no custom flash block handling, but SWF has timed out. Will recover if user unblocks / allows SWF load.
                            if(!sm2.useFlashBlock && canIgnoreFlash) {
                                rebootIntoHTML5();
                            } else {
                                _wDS('waitForever');
                                // fire any regular registered ontimeout() listeners.
                                processOnEvents({
                                    type: 'ontimeout',
                                    ignoreInit: true,
                                    error: {
                                        type: 'INIT_FLASHBLOCK'
                                    }
                                });
                            }
                        }
                    } else {
                        // SWF loaded? Shouldn't be a blocking issue, then.
                        if(sm2.flashLoadTimeout === 0) {
                            _wDS('waitForever');
                        } else {
                            if(!sm2.useFlashBlock && canIgnoreFlash) {
                                rebootIntoHTML5();
                            } else {
                                failSafely(true);
                            }
                        }
                    }
                }
            }, sm2.flashLoadTimeout);
        };
        handleFocus = function() {
            function cleanup() {
                event.remove(window, 'focus', handleFocus);
            }
            if(isFocused || !tryInitOnFocus) {
                // already focused, or not special Safari background tab case
                cleanup();
                return true;
            }
            okToDisable = true;
            isFocused = true;
            _wDS('gotFocus');
            // allow init to restart
            waitingForEI = false;
            // kick off ExternalInterface timeout, now that the SWF has started
            delayWaitForEI();
            cleanup();
            return true;
        };
        flushMessages = function() {
            // <d>
            // SM2 pre-init debug messages
            if(messages.length) {
                sm2._wD('SoundManager 2: ' + messages.join(' '), 1);
                messages = [];
            }
            // </d>
        };
        showSupport = function() {
            // <d>
            flushMessages();
            var item, tests = [];
            if(sm2.useHTML5Audio && sm2.hasHTML5) {
                for(item in sm2.audioFormats) {
                    if(sm2.audioFormats.hasOwnProperty(item)) {
                        tests.push(item + ' = ' + sm2.html5[item] + (!sm2.html5[item] && needsFlash && sm2.flash[item] ? ' (using flash)' : (sm2.preferFlash && sm2.flash[item] && needsFlash ? ' (preferring flash)' : (!sm2.html5[item] ? ' (' + (sm2.audioFormats[item].required ? 'required, ' : '') + 'and no flash support)' : ''))));
                    }
                }
                sm2._wD('SoundManager 2 HTML5 support: ' + tests.join(', '), 1);
            }
            // </d>
        };
        initComplete = function(bNoDisable) {
            if(didInit) {
                return false;
            }
            if(sm2.html5Only) {
                // all good.
                _wDS('sm2Loaded', 1);
                didInit = true;
                initUserOnload();
                debugTS('onload', true);
                return true;
            }
            var wasTimeout = (sm2.useFlashBlock && sm2.flashLoadTimeout && !sm2.getMoviePercent()),
                result = true,
                error;
            if(!wasTimeout) {
                didInit = true;
            }
            error = {
                type: (!hasFlash && needsFlash ? 'NO_FLASH' : 'INIT_TIMEOUT')
            };
            sm2._wD('SoundManager 2 ' + (disabled ? 'failed to load' : 'loaded') + ' (' + (disabled ? 'Flash security/load error' : 'OK') + ') ' + String.fromCharCode(disabled ? 10006 : 10003), disabled ? 2 : 1);
            if(disabled || bNoDisable) {
                if(sm2.useFlashBlock && sm2.oMC) {
                    sm2.oMC.className = getSWFCSS() + ' ' + (sm2.getMoviePercent() === null ? swfCSS.swfTimedout : swfCSS.swfError);
                }
                processOnEvents({
                    type: 'ontimeout',
                    error: error,
                    ignoreInit: true
                });
                debugTS('onload', false);
                catchError(error);
                result = false;
            } else {
                debugTS('onload', true);
            }
            if(!disabled) {
                if(sm2.waitForWindowLoad && !windowLoaded) {
                    _wDS('waitOnload');
                    event.add(window, 'load', initUserOnload);
                } else {
                    // <d>
                    if(sm2.waitForWindowLoad && windowLoaded) {
                        _wDS('docLoaded');
                    }
                    // </d>
                    initUserOnload();
                }
            }
            return result;
        };
        /**
         * apply top-level setupOptions object as local properties, eg., this.setupOptions.flashVersion -> this.flashVersion (soundManager.flashVersion)
         * this maintains backward compatibility, and allows properties to be defined separately for use by soundManager.setup().
         */
        setProperties = function() {
            var i,
                o = sm2.setupOptions;
            for(i in o) {
                if(o.hasOwnProperty(i)) {
                    // assign local property if not already defined
                    if(sm2[i] === _undefined) {
                        sm2[i] = o[i];
                    } else if(sm2[i] !== o[i]) {
                        // legacy support: write manually-assigned property (eg., soundManager.url) back to setupOptions to keep things in sync
                        sm2.setupOptions[i] = sm2[i];
                    }
                }
            }
        };
        init = function() {
            // called after onload()
            if(didInit) {
                _wDS('didInit');
                return false;
            }

            function cleanup() {
                event.remove(window, 'load', sm2.beginDelayedInit);
            }
            if(sm2.html5Only) {
                if(!didInit) {
                    // we don't need no steenking flash!
                    cleanup();
                    sm2.enabled = true;
                    initComplete();
                }
                return true;
            }
            // flash path
            initMovie();
            try {
                // attempt to talk to Flash
                flash._externalInterfaceTest(false);
                // apply user-specified polling interval, OR, if "high performance" set, faster vs. default polling
                // (determines frequency of whileloading/whileplaying callbacks, effectively driving UI framerates)
                setPolling(true, (sm2.flashPollingInterval || (sm2.useHighPerformance ? 10 : 50)));
                if(!sm2.debugMode) {
                    // stop the SWF from making debug output calls to JS
                    flash._disableDebug();
                }
                sm2.enabled = true;
                debugTS('jstoflash', true);
                if(!sm2.html5Only) {
                    // prevent browser from showing cached page state (or rather, restoring "suspended" page state) via back button, because flash may be dead
                    // http://www.webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
                    event.add(window, 'unload', doNothing);
                }
            } catch(e) {
                sm2._wD('js/flash exception: ' + e.toString());
                debugTS('jstoflash', false);
                catchError({
                    type: 'JS_TO_FLASH_EXCEPTION',
                    fatal: true
                });
                // don't disable, for reboot()
                failSafely(true);
                initComplete();
                return false;
            }
            initComplete();
            // disconnect events
            cleanup();
            return true;
        };
        domContentLoaded = function() {
            if(didDCLoaded) {
                return false;
            }
            didDCLoaded = true;
            // assign top-level soundManager properties eg. soundManager.url
            setProperties();
            initDebug();
            /**
             * Temporary feature: allow force of HTML5 via URL params: sm2-usehtml5audio=0 or 1
             * Ditto for sm2-preferFlash, too.
             */
            // <d>
            (function() {
                var a = 'sm2-usehtml5audio=',
                    a2 = 'sm2-preferflash=',
                    b = null,
                    b2 = null,
                    l = wl.toLowerCase();
                if(l.indexOf(a) !== -1) {
                    b = (l.charAt(l.indexOf(a) + a.length) === '1');
                    if(hasConsole) {
                        console.log((b ? 'Enabling ' : 'Disabling ') + 'useHTML5Audio via URL parameter');
                    }
                    sm2.setup({
                        'useHTML5Audio': b
                    });
                }
                if(l.indexOf(a2) !== -1) {
                    b2 = (l.charAt(l.indexOf(a2) + a2.length) === '1');
                    if(hasConsole) {
                        console.log((b2 ? 'Enabling ' : 'Disabling ') + 'preferFlash via URL parameter');
                    }
                    sm2.setup({
                        'preferFlash': b2
                    });
                }
            }());
            // </d>
            if(!hasFlash && sm2.hasHTML5) {
                sm2._wD('SoundManager 2: No Flash detected' + (!sm2.useHTML5Audio ? ', enabling HTML5.' : '. Trying HTML5-only mode.'), 1);
                sm2.setup({
                    'useHTML5Audio': true,
                    // make sure we aren't preferring flash, either
                    // TODO: preferFlash should not matter if flash is not installed. Currently, stuff breaks without the below tweak.
                    'preferFlash': false
                });
            }
            testHTML5();
            if(!hasFlash && needsFlash) {
                messages.push(strings.needFlash);
                // TODO: Fatal here vs. timeout approach, etc.
                // hack: fail sooner.
                sm2.setup({
                    'flashLoadTimeout': 1
                });
            }
            if(doc.removeEventListener) {
                doc.removeEventListener('DOMContentLoaded', domContentLoaded, false);
            }
            initMovie();
            return true;
        };
        domContentLoadedIE = function() {
            if(doc.readyState === 'complete') {
                domContentLoaded();
                doc.detachEvent('onreadystatechange', domContentLoadedIE);
            }
            return true;
        };
        winOnLoad = function() {
            // catch edge case of initComplete() firing after window.load()
            windowLoaded = true;
            // catch case where DOMContentLoaded has been sent, but we're still in doc.readyState = 'interactive'
            domContentLoaded();
            event.remove(window, 'load', winOnLoad);
        };
        /**
         * miscellaneous run-time, pre-init stuff
         */
        preInit = function() {
            if(mobileHTML5) {
                // prefer HTML5 for mobile + tablet-like devices, probably more reliable vs. flash at this point.
                // <d>
                if(!sm2.setupOptions.useHTML5Audio || sm2.setupOptions.preferFlash) {
                    // notify that defaults are being changed.
                    messages.push(strings.mobileUA);
                }
                // </d>
                sm2.setupOptions.useHTML5Audio = true;
                sm2.setupOptions.preferFlash = false;
                if(is_iDevice || (isAndroid && !ua.match(/android\s2\.3/i))) {
                    // iOS and Android devices tend to work better with a single audio instance, specifically for chained playback of sounds in sequence.
                    // common use case: exiting sound onfinish() -> createSound() -> play()
                    // <d>
                    messages.push(strings.globalHTML5);
                    // </d>
                    if(is_iDevice) {
                        sm2.ignoreFlash = true;
                    }
                    useGlobalHTML5Audio = true;
                }
            }
        };
        preInit();
        // sniff up-front
        detectFlash();
        // focus and window load, init (primarily flash-driven)
        event.add(window, 'focus', handleFocus);
        event.add(window, 'load', delayWaitForEI);
        event.add(window, 'load', winOnLoad);
        if(doc.addEventListener) {
            doc.addEventListener('DOMContentLoaded', domContentLoaded, false);
        } else if(doc.attachEvent) {
            doc.attachEvent('onreadystatechange', domContentLoadedIE);
        } else {
            // no add/attachevent support - safe to assume no JS -> Flash either
            debugTS('onload', false);
            catchError({
                type: 'NO_DOM2_EVENTS',
                fatal: true
            });
        }
    } // SoundManager()
    // SM2_DEFER details: http://www.schillmania.com/projects/soundmanager2/doc/getstarted/#lazy-loading
    if(window.SM2_DEFER === undefined || !SM2_DEFER) {
        soundManager = new SoundManager();
    }
    /**
     * SoundManager public interfaces
     * ------------------------------
     */
    if(typeof module === 'object' && module && typeof module.exports === 'object') {
        /**
         * commonJS module
         * note: SM2 requires a window global due to Flash, which makes calls to window.soundManager.
         * flash may not always be needed, but this is not known until async init and SM2 may even "reboot" into Flash mode.
         */
        window.soundManager = soundManager;
        module.exports.SoundManager = SoundManager;
        module.exports.soundManager = soundManager;
    } else if(typeof define === 'function' && define.amd) {
        // AMD - requireJS
        define('SoundManager', [], function() {
            return {
                SoundManager: SoundManager,
                soundManager: soundManager
            };
        });
    } else {
        // standard browser case
        window.SoundManager = SoundManager; // constructor
        window.soundManager = soundManager; // public API, flash callbacks etc.
    }
}(window));

var ngSoundManager = angular.module('angularSoundManager', [])
  .config(['$logProvider', function($logProvider){
    $logProvider.debugEnabled(false);
  }]);


ngSoundManager.filter('humanTime', function () {
        return function (input) {
            function pad(d) {
                return (d < 10) ? '0' + d.toString() : d.toString();
            }

            var min = (input / 1000 / 60) << 0,
                sec = Math.round((input / 1000) % 60);

            return pad(min) + ':' + pad(sec);
        };
    });

ngSoundManager.factory('angularPlayer', ['$rootScope', '$log',
    function($rootScope, $log) {
        
        var currentTrack = null,
            repeat = false,
            autoPlay = true,
            isPlaying = false,
            volume = 90,
            trackProgress = 0,
            playlist = [];
        
        return {
            /**
             * Initialize soundmanager,
             * requires soundmanager2 to be loaded first
             */
            init: function() {
                if(typeof soundManager === 'undefined') {
                    alert('Please include SoundManager2 Library!');
                }
                soundManager.setup({
                    //url: '/path/to/swfs/',
                    //flashVersion: 9,
                    preferFlash: false, // prefer 100% HTML5 mode, where both supported
                    debugMode: false, // enable debugging output ($log.debug() with HTML fallback)
                    useHTML5Audio: true,
                    onready: function() {
                        //$log.debug('sound manager ready!');
                    },
                    ontimeout: function() {
                        alert('SM2 failed to start. Flash missing, blocked or security error?');
                        alert('The status is ' + status.success + ', the error type is ' + status.error.type);
                    },
                    defaultOptions: {
                        // set global default volume for all sound objects
                        autoLoad: false, // enable automatic loading (otherwise .load() will call with .play())
                        autoPlay: false, // enable playing of file ASAP (much faster if "stream" is true)
                        from: null, // position to start playback within a sound (msec), see demo
                        loops: 1, // number of times to play the sound. Related: looping (API demo)
                        multiShot: false, // let sounds "restart" or "chorus" when played multiple times..
                        multiShotEvents: false, // allow events (onfinish()) to fire for each shot, if supported.
                        onid3: null, // callback function for "ID3 data is added/available"
                        onload: null, // callback function for "load finished"
                        onstop: null, // callback for "user stop"
                        onfailure: 'nextTrack', // callback function for when playing fails
                        onpause: null, // callback for "pause"
                        onplay: null, // callback for "play" start
                        onresume: null, // callback for "resume" (pause toggle)
                        position: null, // offset (milliseconds) to seek to within downloaded sound.
                        pan: 0, // "pan" settings, left-to-right, -100 to 100
                        stream: true, // allows playing before entire file has loaded (recommended)
                        to: null, // position to end playback within a sound (msec), see demo
                        type: 'audio/mp3', // MIME-like hint for canPlay() tests, eg. 'audio/mp3'
                        usePolicyFile: false, // enable crossdomain.xml request for remote domains (for ID3/waveform access)
                        volume: volume, // self-explanatory. 0-100, the latter being the max.
                        whileloading: function() {
                            //soundManager._writeDebug('sound '+this.id+' loading, '+this.bytesLoaded+' of '+this.bytesTotal);
                            var trackLoaded = ((this.bytesLoaded/this.bytesTotal)*100);
                            $rootScope.$broadcast('track:loaded', trackLoaded);
                        },
                        whileplaying: function() {
                            //soundManager._writeDebug('sound '+this.id+' playing, '+this.position+' of '+this.duration);
                            //broadcast current playing track id
                            currentTrack = this.id;
                            //$rootScope.$broadcast('track:id', this.id);
                            //broadcast current playing track progress
                            trackProgress = ((this.position / this.duration) * 100);
                            $rootScope.$broadcast('track:progress', trackProgress);
                            //broadcast track position
                            $rootScope.$broadcast('currentTrack:position', this.position);
                            //broadcast track duration
                            $rootScope.$broadcast('currentTrack:duration', this.duration);
                        },
                        onfinish: function() {
                            soundManager._writeDebug(this.id + ' finished playing');
                            if(autoPlay === true) {
                                //play next track if autoplay is on
                                //get your angular app
                                var elem = angular.element(document.querySelector('[ng-app]'));
                                //get the injector.
                                var injector = elem.injector();
                                //get the service.
                                var angularPlayer = injector.get('angularPlayer');
                                angularPlayer.nextTrack();
                                $rootScope.$broadcast('track:id', currentTrack);
                            }
                        }
                    }
                });
                soundManager.onready(function() {
                    $log.debug('song manager ready!');
                    // Ready to use; soundManager.createSound() etc. can now be called.
                    var isSupported = soundManager.ok();
                    $log.debug('is supported: ' + isSupported);
                    $rootScope.$broadcast('angularPlayer:ready', true);
                });
            },
            /**
             * To check if value is in array
             */
            isInArray: function(array, value) {
                for(var i = 0; i < array.length; i++) {
                    if(array[i].id === value) {
                        return i;
                    }
                }
                return false;
            },
            /**
             * getIndexByValue used by this factory
             */
            getIndexByValue: function(array, value) {
                for(var i = 0; i < array.length; i++) {
                    if(array[i] === value) {
                        return i;
                    }
                }
                return false;
            },
            /**
             * asyncLoop used by this factory
             */
            asyncLoop: function(o) {
                var i = -1;
                var loop = function() {
                    i++;
                    if(i == o.length) {
                        o.callback();
                        return;
                    }
                    o.functionToLoop(loop, i);
                };
                loop(); //init
            },
            setCurrentTrack: function(key) {
                currentTrack = key;
            },
            getCurrentTrack: function() {
                return currentTrack;
            },
            currentTrackData: function() {
                var trackId = this.getCurrentTrack();
                var currentKey = this.isInArray(playlist, trackId);
                return playlist[currentKey];
            },
            getPlaylist: function(key) {
                if(typeof key === 'undefined') {
                    return playlist;
                } else {
                    return playlist[key];
                }
            },
            addToPlaylist: function(track) {
                playlist.push(track);
                //broadcast playlist
                $rootScope.$broadcast('player:playlist', playlist);
            },
            isTrackValid: function (track) {
                if (typeof track == 'undefined') {
                    $log.debug('invalid track data');
                    return false;
                }

                if (track.url.indexOf("soundcloud") > -1) {
                    //if soundcloud url
                    if(typeof track.url == 'undefined') {
                        $log.debug('invalid soundcloud track url');
                        return false;
                    }
                } else {
                    if(soundManager.canPlayURL(track.url) !== true) {
                        $log.debug('invalid song url');
                        return false;
                    }
                }
            },
            addTrack: function(track) {
                //check if track itself is valid and if its url is playable
                if (!this.isTrackValid) {
                    return null;
                }

                //check if song already does not exists then add to playlist
                var inArrayKey = this.isInArray(this.getPlaylist(), track.id);
                if(inArrayKey === false) {
                    //$log.debug('song does not exists in playlist');
                    //add to sound manager
                    soundManager.createSound({
                        id: track.id,
                        url: track.url
                    });
                    //add to playlist
                    this.addToPlaylist(track);
                }
                return track.id;
            },
            removeSong: function(song, index) {
                //if this song is playing stop it
                if(song === currentTrack) {
                    this.stop();
                }
                //unload from soundManager
                soundManager.destroySound(song);
                //remove from playlist
                playlist.splice(index, 1);
                //once all done then broadcast
                $rootScope.$broadcast('player:playlist', playlist);
            },
            initPlayTrack: function(trackId, isResume) {
                if(isResume !== true) {
                    //stop and unload currently playing track
                    this.stop();
                    //set new track as current track
                    this.setCurrentTrack(trackId);
                }
                //play it
                soundManager.play(trackId);
                $rootScope.$broadcast('track:id', trackId);
                //set as playing
                isPlaying = true;
                $rootScope.$broadcast('music:isPlaying', isPlaying);
            },
            play: function() {
                var trackToPlay = null;
                //check if no track loaded, else play loaded track
                if(this.getCurrentTrack() === null) {
                    if(soundManager.soundIDs.length === 0) {
                        $log.debug('playlist is empty!');
                        return;
                    }
                    trackToPlay = soundManager.soundIDs[0];
                    this.initPlayTrack(trackToPlay);
                } else {
                    trackToPlay = this.getCurrentTrack();
                    this.initPlayTrack(trackToPlay, true);
                }
            },
            pause: function() {
                soundManager.pause(this.getCurrentTrack());
                //set as not playing
                isPlaying = false;
                $rootScope.$broadcast('music:isPlaying', isPlaying);
            },
            stop: function() {
                //first pause it
                this.pause();
                this.resetProgress();
                $rootScope.$broadcast('track:progress', trackProgress);
                $rootScope.$broadcast('currentTrack:position', 0);
                $rootScope.$broadcast('currentTrack:duration', 0);
                soundManager.stopAll();
                soundManager.unload(this.getCurrentTrack());
            },
            playTrack: function(trackId) {
                this.initPlayTrack(trackId);
            },
            nextTrack: function() {
                if(this.getCurrentTrack() === null) {
                    $log.debug("Please click on Play before this action");
                    return null;
                }
                var currentTrackKey = this.getIndexByValue(soundManager.soundIDs, this.getCurrentTrack());
                var nextTrackKey = +currentTrackKey + 1;
                var nextTrack = soundManager.soundIDs[nextTrackKey];
                if(typeof nextTrack !== 'undefined') {
                    this.playTrack(nextTrack);
                } else {
                    //if no next track found
                    if(repeat === true) {
                        //start first track if repeat is on
                        this.playTrack(soundManager.soundIDs[0]);
                    } else {
                        //breadcase not playing anything
                        isPlaying = false;
                        $rootScope.$broadcast('music:isPlaying', isPlaying);
                    }
                }
            },
            prevTrack: function() {
                if(this.getCurrentTrack() === null) {
                    $log.debug("Please click on Play before this action");
                    return null;
                }
                var currentTrackKey = this.getIndexByValue(soundManager.soundIDs, this.getCurrentTrack());
                var prevTrackKey = +currentTrackKey - 1;
                var prevTrack = soundManager.soundIDs[prevTrackKey];
                if(typeof prevTrack !== 'undefined') {
                    this.playTrack(prevTrack);
                } else {
                    $log.debug('no prev track found!');
                }
            },
            mute: function() {
                if(soundManager.muted === true) {
                    soundManager.unmute();
                } else {
                    soundManager.mute();
                }
                $rootScope.$broadcast('music:mute', soundManager.muted);
            },
            getMuteStatus: function() {
                return soundManager.muted;
            },
            repeatToggle: function() {
                if(repeat === true) {
                    repeat = false;
                } else {
                    repeat = true;
                }
                $rootScope.$broadcast('music:repeat', repeat);
            },
            getRepeatStatus: function() {
                return repeat;
            },
            getVolume: function() {
                return volume;
            },
            adjustVolume: function(increase) {
                var changeVolume = function(volume) {
                    for(var i = 0; i < soundManager.soundIDs.length; i++) {
                        var mySound = soundManager.getSoundById(soundManager.soundIDs[i]);
                        mySound.setVolume(volume);
                    }
                    $rootScope.$broadcast('music:volume', volume);
                };
                if(increase === true) {
                    if(volume < 100) {
                        volume = volume + 10;
                        changeVolume(volume);
                    }
                } else {
                    if(volume > 0) {
                        volume = volume - 10;
                        changeVolume(volume);
                    }
                }
            },
            adjustVolumeSlider: function(value) {
                var changeVolume = function(volume) {
                    for(var i = 0; i < soundManager.soundIDs.length; i++) {
                        var mySound = soundManager.getSoundById(soundManager.soundIDs[i]);
                        mySound.setVolume(volume);
                    }
                    $rootScope.$broadcast('music:volume', volume);
                };
                changeVolume(value);
            },
            clearPlaylist: function(callback) {
                $log.debug('clear playlist');
                this.resetProgress();
                //unload and destroy soundmanager sounds
                var smIdsLength = soundManager.soundIDs.length;
                this.asyncLoop({
                    length: smIdsLength,
                    functionToLoop: function(loop, i) {
                        setTimeout(function() {
                            //custom code
                            soundManager.destroySound(soundManager.soundIDs[0]);
                            //custom code
                            loop();
                        }, 100);
                    },
                    callback: function() {
                        //callback custom code
                        $log.debug('All done!');
                        //clear playlist
                        playlist = [];
                        $rootScope.$broadcast('player:playlist', playlist);
                        callback(true);
                        //callback custom code
                    }
                });
            },
            resetProgress: function() {
                trackProgress = 0;
            },
            isPlayingStatus: function() {
                return isPlaying;
            }
        };
    }
]);


ngSoundManager.directive('soundManager', ['$filter', 'angularPlayer',
    function($filter, angularPlayer) {
        return {
            restrict: "E",
            link: function(scope, element, attrs) {
                //init and load sound manager 2
                angularPlayer.init();
                scope.$on('track:progress', function(event, data) {
                    scope.$apply(function() {
                        scope.progress = data;
                    });
                });
                scope.$on('track:id', function(event, data) {
                    scope.$apply(function() {
                        scope.currentPlaying = angularPlayer.currentTrackData();
                    });
                });
                scope.$on('currentTrack:position', function(event, data) {
                    scope.$apply(function() {
                        scope.currentPostion = $filter('humanTime')(data);
                    });
                });
                scope.$on('currentTrack:duration', function(event, data) {
                    scope.$apply(function() {
                        scope.currentDuration = $filter('humanTime')(data);
                    });
                });
                scope.isPlaying = false;
                scope.$on('music:isPlaying', function(event, data) {
                    scope.$apply(function() {
                        scope.isPlaying = data;
                    });
                });
                scope.playlist = angularPlayer.getPlaylist(); //on load
                scope.$on('player:playlist', function(event, data) {
                    scope.$apply(function() {
                        scope.playlist = data;
                    });
                });
            }
        };
    }
]);

ngSoundManager.directive('musicPlayer', ['angularPlayer', '$log',
    function(angularPlayer, $log) {
        return {
            restrict: "EA",
            scope: {
                song: "=addSong"
            },
            link: function(scope, element, attrs) {
                var addToPlaylist = function() {
                    var trackId = angularPlayer.addTrack(scope.song);
                    //if request to play the track
                    if(attrs.musicPlayer === 'play') {
                        angularPlayer.playTrack(trackId);
                    }
                };
                element.bind('click', function() {
                    $log.debug('adding song to playlist');
                    addToPlaylist();
                });
            }
        };
    }
]);


ngSoundManager.directive('playFromPlaylist', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            scope: {
                song: "=playFromPlaylist"
            },
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    angularPlayer.playTrack(scope.song.id);
                });
            }
        };
    }]);

ngSoundManager.directive('removeFromPlaylist', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            scope: {
                song: "=removeFromPlaylist"
            },
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    angularPlayer.removeSong(scope.song.id, attrs.index);
                });
            }
        };
    }
]);

ngSoundManager.directive('seekTrack', ['angularPlayer', '$log', function (angularPlayer, $log) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    if (angularPlayer.getCurrentTrack() === null) {
                        $log.debug('no track loaded');
                        return;
                    }

                    var sound = soundManager.getSoundById(angularPlayer.getCurrentTrack());

                    var getXOffset = function (event) {
                      var x = 0, element = event.target;
                      while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
                        x += element.offsetLeft - element.scrollLeft;
                        element = element.offsetParent;
                      }
                      return event.clientX - x;
                    };

                    var x = event.offsetX || getXOffset(event),
                        width = element[0].clientWidth,
                        duration = sound.durationEstimate;

                    sound.setPosition((x / width) * duration);
                });

            }
        };
    }]);


ngSoundManager.directive('playMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.play();
                });

            }
        };
    }]);

ngSoundManager.directive('pauseMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    angularPlayer.pause();
                });
            }
        };
    }]);

ngSoundManager.directive('stopMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {
                element.bind('click', function (event) {
                    angularPlayer.stop();
                });
            }
        };
    }]);

ngSoundManager.directive('nextTrack', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.nextTrack();
                });

            }
        };
    }]);

ngSoundManager.directive('prevTrack', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.prevTrack();
                });

            }
        };
    }]);

ngSoundManager.directive('muteMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.mute();
                });

                scope.mute = angularPlayer.getMuteStatus();
                scope.$on('music:mute', function (event, data) {
                    scope.$apply(function () {
                        scope.mute = data;
                    });
                });

            }
        };
    }]);

ngSoundManager.directive('repeatMusic', ['angularPlayer', function (angularPlayer) {
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {

                element.bind('click', function (event) {
                    angularPlayer.repeatToggle();
                });

                scope.repeat = angularPlayer.getRepeatStatus();
                scope.$on('music:repeat', function (event, data) {
                    scope.$apply(function () {
                        scope.repeat = data;
                    });
                });
            }
        };
    }]);

ngSoundManager.directive('musicVolume', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    if(attrs.type === 'increase') {
                        angularPlayer.adjustVolume(true);
                    } else {
                        angularPlayer.adjustVolume(false);
                    }
                });
                scope.volume = angularPlayer.getVolume();
                scope.$on('music:volume', function(event, data) {
                    scope.$apply(function() {
                        scope.volume = data;
                    });
                });
            }
        };
    }
]);

ngSoundManager.directive('clearPlaylist', ['angularPlayer', '$log',
    function(angularPlayer, $log) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    //first stop any playing music
                    angularPlayer.stop();
                    angularPlayer.setCurrentTrack(null);
                    angularPlayer.clearPlaylist(function(data) {
                      $log.debug('all clear!');
                    });
                });
            }
        };
    }
]);


ngSoundManager.directive('playAll', ['angularPlayer', '$log',
    function(angularPlayer, $log) {
        return {
            restrict: "EA",
            scope: {
                songs: '=playAll'
            },
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    //first clear the playlist
                    angularPlayer.clearPlaylist(function(data) {
                        $log.debug('cleared, ok now add to playlist');
                        //add songs to playlist
                        for(var i = 0; i < scope.songs.length; i++) {
                            angularPlayer.addTrack(scope.songs[i]);
                        }
                        
                        if (attrs.play != 'false') {
                            //play first song
                            angularPlayer.play();
                        }
                    });
                });
            }
        };
    }
]);


ngSoundManager.directive('volumeBar', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                element.bind('click', function(event) {
                    var getXOffset = function(event) {
                        var x = 0,
                            element = event.target;
                        while(element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
                            x += element.offsetLeft - element.scrollLeft;
                            element = element.offsetParent;
                        }
                        return event.clientX - x;
                    };
                    var x = event.offsetX || getXOffset(event),
                        width = element[0].clientWidth,
                        duration = 100;
                    var volume = (x / width) * duration;
                    angularPlayer.adjustVolumeSlider(volume);
                });
                scope.volume = angularPlayer.getVolume();
                scope.$on('music:volume', function(event, data) {
                    scope.$apply(function() {
                        scope.volume = data;
                    });
                });
            }
        };
    }
]);

ngSoundManager.directive('playPauseToggle', ['angularPlayer',
    function(angularPlayer) {
        return {
            restrict: "EA",
            link: function(scope, element, attrs) {
                scope.$on('music:isPlaying', function(event, data) {
                    //update html
                    if (data) {
                        if(typeof attrs.pause != 'undefined') {
                            element.html(attrs.pause);
                        } else {
                            element.html('Pause');
                        }
                    } else {
                        if(typeof attrs.play != 'undefined') {
                            element.html(attrs.play);
                        } else {
                            element.html('Play');
                        }
                    }
                });
                
                element.bind('click', function(event) {
                    if(angularPlayer.isPlayingStatus()) {
                        //if playing then pause
                        angularPlayer.pause();
                    } else {
                        //else play if not playing
                        angularPlayer.play();
                        
                    }
                });
            }
        };
    }
]);

/*
DEPENDENCIES
    -JQUERY
    -ANGULARJS

*/

var page = {
    APPNAME: "sandbox",
    isLoggedIn: false,
    ngModules: [
        "ui.bootstrap",
        "ngAnimate",
        "ngRoute",
        "toastr",
        "ngSanitize",
        "ngCookies",
        'color.picker'
    ],

    startSite: (callback) => {
        (() => angular.module(page.APPNAME, page.ngModules))();

        if (callback && typeof (callback) === 'function')
            $(document).ready(callback);
    },

    utilities: {

        print: (usePopupWindow, id) => {
            var popupWinindow = window.open('', '_blank', 'width=' + window.innerWidth + ',height=' + window.innerHeight + ',scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no'),
                beforePrint = () => { },
                afterPrint = () => popupWinindow.close(),
                printContents = id ? document.querySelector('#' + id).outerHTML : document.body.outerHTML,
                originalContents = document.body.outerHTML,
                links = document.querySelectorAll('link'),
                printBody = '<body onload="window.print(); window.focus();">' + printContents + '</body>',
                printHead = '<html><head>';

            for (var i = 0; i < Object.keys(links).length; i++)
                if (typeof (links[i]) !== 'undefined')
                    printHead += links[i].outerHTML;

            printHead += '</head>{0}</html>';

            if (usePopupWindow) {
                popupWinindow.document.open();
                popupWinindow.document.write(printHead.replace("{0}", printBody));
                popupWinindow.document.close();


                if (popupWinindow.matchMedia) {
                    var mediaQueryList = window.matchMedia('print');
                    mediaQueryList.addListener((mql) => {
                        if (mql.matches) {
                            beforePrint();
                        } else {
                            afterPrint();
                        }
                    });
                }

                popupWinindow.onbeforeprint = beforePrint;
                popupWinindow.onafterprint = afterPrint;
            }
            else {

                document.body.innerHTML = printBody;
                window.print();
                document.body.innerHTML = originalContents;
            }
        },

        getDeviceWidth: () => $(window).width(),

        checkForJQEvent: (element, event) => {
            var result = false,
                curEvents = $._data($(element).get(0), 'events');

            for (var e in curEvents) {
                result = event === e;

                if (result)
                    break;
            }

            return result;
        },

        setUpJQSwipeHandlers: () => {
            var supportTouch = $.support.touch,
                scrollEvent = "touchmove scroll",
                touchStartEvent = supportTouch ? "touchstart" : "mousedown",
                touchStopEvent = supportTouch ? "touchend" : "mouseup",
                touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

            $.event.special.swipeupdown = {
                setup: function () {
                    var thisObject = this;

                    var $this = $(thisObject);

                    $this.bind(touchStartEvent, (event) => {
                        var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
                            start = {
                                time: (new Date).getTime(),
                                coords: [data.pageX, data.pageY],
                                origin: $(event.target)
                            },
                            stop;

                        var moveHandler = (event) => {
                            if (!start)
                                return;

                            var data = event.originalEvent.touches ?
                                event.originalEvent.touches[0] :
                                event;

                            stop = {
                                time: (new Date).getTime(),
                                coords: [data.pageX, data.pageY]
                            };

                            // prevent scrolling
                            if (Math.abs(start.coords[1] - stop.coords[1]) > 10)
                                event.preventDefault();
                        };

                        $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent,
                            (event) => {
                                $this.unbind(touchMoveEvent, moveHandler);
                                if (start && stop) {
                                    if (stop.time - start.time < 1000 &&
                                        Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                        Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                        start.origin
                                            .trigger("swipeupdown")
                                            .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                                    }
                                }
                                start = stop = undefined;
                            });
                    });
                }
            };

            $.each({ swipedown: "swipeupdown", swipeup: "swipeupdown" },
                (event, sourceEvent) => {
                    $.event.special[event] = {
                        setup: () => {
                            $(this).bind(sourceEvent, $.noop);
                        }
                    };
                });
        },

        inlineSvgs: (hoverColor) => {
            hoverColor = hoverColor || 'black';
            /*
             * Replace all SVG images with inline SVG
             */

            $('img').each((num, ele) => {
                var $img = $(ele);
                var imgID = $img.attr('id');
                var imgClass = $img.attr('class');
                var imgStyle = $img.attr('style');
                var imgURL = $img.attr('src');

                if (imgURL && imgURL.includes('.svg'))
                    $.get(imgURL, (data) => {
                        var $svg = $(data).find('svg');

                        if (typeof imgID !== 'undefined')
                            $svg = $svg.attr('id', imgID);

                        if (typeof imgStyle !== 'undefined')
                            $svg = $svg.attr('style', imgStyle);

                        if (typeof imgClass !== 'undefined')
                            $svg = $svg.attr('class', imgClass + ' replaced-svg');

                        //ADD HOVER COLOR CHANGE FOR SVGS
                        /*
                        var previousColor = '#FFFFFF';
                        $svg.mouseover(() => $svg.find("path").each((n, e) => {
                            var path = $(e);
                            previousColor = path.attr('fill');
                            path.css({
                                fill: hoverColor
                            });
                        }));

                        $svg.mouseout(() => $svg.find("path").each((n, e) => {
                            setTimeout(
                                () => $(e).css({
                                    fill: previousColor
                                }), 1000);
                        }));
                        */

                        // Remove any invalid XML tags as per http://validator.w3.org
                        $svg = $svg.removeAttr('xmlns:a');

                        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
                        if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width'))
                            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))

                        // Replace image with new SVG
                        $img.replaceWith($svg);
                    }, 'xml');
            });
        },

        googleSearch: (input) => {
            if (typeof (input) !== 'string')
                throw 'input is not a string...';

            var url = 'https://www.google.com/search?q=';

            var keyWords = input.split(' ');

            for (var word of keyWords)
                url += '+' + word;

            window.open(url);
        },

        getImage: (path) => {
            return new Promise((resolve, reject) => {
                var img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = path;
            });
        },

        length: (obj) => {
            if (Array.isArray(obj))
                return obj.length;
            else if (typeof (obj) === 'object') {
                var length = 0;
                for (var prop in obj)
                    length++;
                return length;
            }
            else
                return null;
        },

        in: (obj, values) => {
            for (var i = 0; i < values.length; i++)
                if (values[i] === obj) return true;
            return false;
        },

        select: (converter, values) => {
            var result = [];
            for (let i = 0; i < values.length; i++)
                result.push(converter(values[i]));

            return result;
        },

        any: (predicate, values) => {
            for (var i = 0; i < values.length; i++)
                if (predicate(values[i]))
                    return true;
            return false;
        },

        loadFromUrl: (url, callback, sourceType) => {
            $.ajax({
                url: url,
                dataType: sourceType || 'script',
                success: callback,
                async: true
            });
        },

        equals: (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2),

        clone: (obj) => JSON.parse(JSON.stringify(obj)),

        getStyleFromElement: (id) => {
            return document.getElementById(id).style;
        },

        getStyleFromUrl: (url, linkId) => {
            linkId = linkId || randomString();
            if (!document.getElementById(linkId)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = linkId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.media = 'all';
                head.appendChild(link);
            }
        },

        writeStyles: (styleName, cssRules) => {
            var styleElement = document.getElementById(styleName);
            var pastCssRules = (styleElement && styleElement.textContent) ? styleElement.textContent : null;

            if (styleElement) {
                document.getElementsByTagName('head')[0].removeChild(
                    styleElement);
            }

            styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.id = styleName;

            if (cssRules.length) {
                for (var css of cssRules) {
                    styleElement.appendChild(document.createTextNode(css));
                }
            }
            else {
                styleElement.innerHTML = cssRules;
            }

            document.getElementsByTagName('head')[0].appendChild(styleElement);
        },

        doesUrlExist: (method, url) => {
            var xhr = new XMLHttpRequest();
            if ("withCredentials" in xhr) {
                // XHR for Chrome/Firefox/Opera/Safari.
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest !== "undefined") {
                // XDomainRequest for IE.
                xhr = new XDomainRequest();
                xhr.open(method, url);
            } else {
                // CORS not supported.
                xhr = null;
            }
            return xhr;
        },

        getRandomColor: () => {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },

        getInactiveTime: () => {
            var t;
            window.onload = resetTimer;
            document.onload = resetTimer;
            document.onmousemove = resetTimer;
            document.onmousedown = resetTimer; // touchscreen presses
            document.ontouchstart = resetTimer;
            document.onclick = resetTimer;     // touchpad clicks
            document.onscroll = resetTimer;    // scrolling with arrow keys
            document.onkeypress = resetTimer;

            var logout = () => {
                console.log("Inactive action...");
            }

            var resetTimer = () => {
                clearTimeout(t);
                t = setTimeout(logout, 3000);
            }
        },

        getProviders: () => {
            angular.module(page.APPNAME)['_invokeQueue'].forEach(function (value) {
                console.log(value[1] + ": " + value[2][0]);
            });
        },

        randomString: (len) => {
            if (typeof (len) !== 'number')
                throw "parameter len has to be a interger...";

            var anysize = len;
            var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            result = "";
            for (var i = 0; i < anysize; i++)
                result += charset[Math.floor(Math.random() * charset.length)];

            return result;
        },

        removeAllLinks: (link) => {
            for (var tag of $('a')) {
                var ele = $(tag);

                if (ele.attr('href'))
                    ele.attr('href', link || '');
            }
        },

        changeTargetedColors: (colorsToCheck, onMatch, onMisMatch) => {
            for (let tag of $('*')) {
                let ele = $(tag);

                for (let pair of colorsToCheck) {
                    if (pair[2] && pair[2].length !== 0) {
                        for (let attr of pair[2]) {
                            let colorToChange = pair[0];
                            let changeToColor = pair[1];

                            if (ele.css(attr) === colorToChange) {
                                onMatch(ele);

                                if (changeToColor.includes('!important'))
                                    ele.attr('style', attr + ': ' + changeToColor);
                                else
                                    ele.css(attr, changeToColor);
                            }
                            else {
                                onMisMatch(ele);
                            }
                        }
                    }
                }
            }
        },

        isValidURL: (url) => {
            var urlPattern = "(https?|ftp)://(www\\.)?(((([a-zA-Z0-9.-]+\\.){1,}[a-zA-Z]{2,4}|localhost))|((\\d{1,3}\\.){3}(\\d{1,3})))(:(\\d+))?(/([a-zA-Z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?(\\?([a-zA-Z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*)?(#([a-zA-Z0-9._-]|%[0-9A-F]{2})*)?";

            urlPattern = "^" + urlPattern + "$";
            var regex = new RegExp(urlPattern);

            return regex.test(url);
        },

        removeElement: (elementId) => {
            // Removes an element from the document
            var element = document.getElementById(elementId);
            element.parentNode.removeChild(element);
        }
    }
};

page.APPNAME = 'obl-site';
page.ngModules.push('fullPage.js');
page.ngModules.push('ui.router');

page.sliderOptions = {
    licenseKey: '6D8C01FB-3C9B4F3A-93CBFC04-52802A55',
    sectionsColor: [
        'rgba(255, 255, 255, 0.30)'
        , 'rgba(255, 255, 255, 0.30)'
        , 'rgba(255, 255, 255, 0.30)'
        , 'rgba(255, 255, 255, 0.30)'
        , 'rgba(255, 255, 255, 0.30)'
    ],
    navigation: true,
    navigationPosition: 'right',
    showActiveTooltip: false,
    slidesNavigation: true,
    slidesNavPosition: 'bottom',
    lockAnchors: true,
    scrollBar: false,

    //Scrolling
    css3: true,
    scrollingSpeed: 800,
    autoScrolling: true,
    fitToSection: true,
    loopBottom: false,
    loopTop: false,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,

    //Accessibility
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,

    //Design
    controlArrows: true,
    verticalCentered: true,

    //Custom selectors
    sectionSelector: '.section',
    slideSelector: '.slide',

    lazyLoading: true
};

page.fixFooter = () => {

    var path = window.location.hash,
        width = page.utilities.getDeviceWidth();

    if (width < 768) {
        if (path === '#!/home' || path === '#!/entertainment') {
            $('#normal-footer').hide();
        }
    }
    else if (path === '#!/music') {
        $('#normal-footer').show();
        $('#normal-footer').removeClass('fixed-footer');
        $('#normal-footer').addClass('absolute-footer');
    }
    else {
        $('#normal-footer').show();
        $('#normal-footer').removeClass('absolute-footer');
        $('#normal-footer').addClass('fixed-footer');
    }
}

page.renderParticles = (data) => {
    var particles = {

        "particles": {
            "number": {
                "value": 75,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#BB5D5D"
            },
            "shape": {
                "type": "image", //"circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "assets/img/obl.2.400.png",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 10,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 500,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 2
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "bubble"
                },
                "onclick": {
                    "enable": true,
                    "mode": "repulse"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 4,
                    "duration": 0.3,
                    "opacity": 1,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    };

    if (data) {
        for (var prop in data) {
            if (particles[prop]) {
                if (typeof (particles[prop]) === 'object') {
                    for (var p in data[prop])
                        if (particles[prop][p])
                            particles[prop][p] = data[prop][p];
                }

                else
                    particles[prop] = data[prop];
            }
        }
    }

    particlesJS('particles-js', particles);
}

page.animate = (element, animation, callback, speedClass) => {

    var node = null;
    if (typeof (element) === 'object')
        node = element.get(0);
    else
        node = document.querySelector(element);

    node.classList.add('animated', animation);
    if (speedClass)
        node.classList.add(speedClass);

    function handleAnimationEnd() {
        node.classList.remove('animated', animation);
        node.removeEventListener('animationend', handleAnimationEnd);

        if (callback && typeof callback === 'function')
            callback();
    }

    node.addEventListener('animationend', handleAnimationEnd);
}

page.startSite(() => {
    angular.element(window).bind('resize', page.fixFooter);
    page.utilities.setUpJQSwipeHandlers();

});
Array.prototype.add = function (obj) {
    if (this.findIndex((a) => a.key === obj.key) !== -1) {
        this[this.findIndex((a) => a.key === obj.key)] = obj;
    }
    else { this.push(obj); }
}

Array.prototype.findByKey = function (key) {
    if (this.findIndex((a) => a.key === key) !== -1) {
        return this[this.findIndex((a) => a.key === key)];
    }
    else { return null; }
}

Array.prototype.any = function (func) {
    if (!func instanceof Function)
        return false;
    else {
        for (let item of this) {
            if (func(item) === true)
                return true;
        }

        return false;
    }
}

Array.prototype.in = function (value) {
    for (let item of this) {
        if (item === value)
            return true;
    }
    return false;
}


Number.prototype.toKey = function (keyAndValueArr) {
    if (!Array.isArray(arr)) { return this; }
    var key = null;

    for (let item of keyAndValueArr) {
        if (!item || !item.key || !item.value) { continue; };

        key = (this === item.value) ? item.key : this;
    }
    return key;
}


String.prototype.safeName = function () {
    return this.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~\s+]/g, '');
}



String.prototype.replaceAt = function (index, replacement, replacementLength) {
    return this.substr(0, index) + replacement + this.substr(index + replacementLength || index + replacement.length);
}


  
(function () {

    page.baseController = angular.module(page.APPNAME)
        .factory("$baseController", baseController);

    baseController.$inject = [
        '$document'
        , '$systemEventService'
        , '$alertService'
        , "$window"
        , "$location"
        , '$uibModal'
        , '$timeout'
        , '$http'
        , '$sce'
        , '$cookies'
        , '$q'];

    function baseController($document, $systemEventService, $alertService, $window, $location, $uibModal, $timeout, $http, $sce, $cookies, $q) {

        //PUBLIC
        var base = {
            document: $document,
            event: $systemEventService,
            alert: $alertService,
            window: $window,
            modal: $uibModal,
            timeout: $timeout,
            http: $http,
            sce: $sce,
            cookies: $cookies,
            Q: $q
        };

        base.tryAgain = function (maxLoops, miliseconds, promiseMethod, onSuccess) {

            if (onSuccess === null) { onSuccess = (data) => console.log(data); }
            var root = {};

            root.promiseMethod = promiseMethod;
            root.currentIndex = 0;

            _start();

            function _start() {
                var method = () => _repeatUntilSuccessful(root.promiseMethod(), miliseconds, maxLoops, data => onSuccess(data));
                base.timeout(method, miliseconds);
            }

            function _repeatUntilSuccessful(promise, time, maxLoops, callback = null) {

                function delay(time, val) {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(val);
                        }, time);
                    });
                }

                function success(data) {
                    if (callback !== null) {
                        callback(data);
                    }
                    return;
                }

                function error(data) {
                    if (root.currentIndex >= maxLoops) { return; }
                    else {
                        return delay(time).then(
                            () => { root.currentIndex++; _repeatUntilSuccessful(root.promiseMethod(), time, maxLoops, callback); },
                            () => { root.currentIndex++; _repeatUntilSuccessful(root.promiseMethod(), time, maxLoops, callback); }
                        );
                    }
                }

                base.Q.when(promise, success, error);

            }

        }

        base.errorCheck = function (err, tryAgainObj) {

            if (!tryAgainObj)
                tryAgainObj = {};


            if (!tryAgainObj.maxLoops)
                tryAgainObj.maxLoops = 3;


            if (!tryAgainObj.miliseconds)
                tryAgainObj.miliseconds = 1000;


            if (!tryAgainObj.promiseMethod)
                tryAgainObj.promiseMethod = () => {
                    return new Promise((resolve, reject) => {
                        resolve();
                    });
                }


            if (!tryAgainObj.onSuccess)
                tryAgainObj.onSuccess = (data) => console.log(data);


            if (err.data.errors && err.data.errors.length) {
                for (var error of err.data.errors) {
                    switch (error) {

                        default:
                            if (!tryAgainObj || !tryAgainObj.maxLoops || !tryAgainObj.miliseconds || !tryAgainObj.promiseMethod)
                                return;
                            else
                                base.tryAgain(tryAgainObj.maxLoops
                                    , tryAgainObj.miliseconds
                                    , tryAgainObj.promiseMethod
                                    , tryAgainObj.onSuccess);
                            break;
                    }
                }
            }
            else {
                switch (err.status) {
                    //case 401:
                    //    base.loginPopup();
                    //    break;

                    default:
                        if (!tryAgainObj || !tryAgainObj.maxLoops || !tryAgainObj.miliseconds || !tryAgainObj.promiseMethod) { return; }
                        base.tryAgain(tryAgainObj.maxLoops
                            , tryAgainObj.miliseconds
                            , tryAgainObj.promiseMethod
                            , tryAgainObj.onSuccess);
                        break;
                }
            }
        }

        base.defaultListeners = function (scope, listeners) {

            //#region Default Listeners

            $systemEventService.listen('$viewContentLoaded', () => {
                window.ga('send', 'pageview', { page: $location.url() });
            }, scope);

            //#endregion

            if (listeners) {

                var isArray = Array.isArray(listeners);
                var length = isArray ? listeners.length : typeof (listeners) === 'object' ? Object.keys(listeners).length : 0;

                for (var i = 0; i < length; i++) {

                    var event = isArray ? (listeners[i].event || null) : Object.keys(listeners)[i],
                        method = isArray ? (listeners[i].method || null) : listeners[Object.keys(listeners)[i]];


                    if (event && method)
                        $systemEventService.listen(event, method, scope);
                }
            }
        }

        return base;
    }

})();
function chartistScroll(scrollbarOptions) {

    return _chartistScoll;

    function _writeStyles(styleName, cssRules) {
        var styleElement = document.getElementById(styleName);
        var pastCssRules = (styleElement && styleElement.textContent) ? styleElement.textContent : null;

        if (styleElement) {
            document.getElementsByTagName('head')[0].removeChild(
                styleElement);
        }

        styleElement = document.createElement('style');
        styleElement.type = 'text/css';
        styleElement.id = styleName;


        if (cssRules.length) {
            for (var css of cssRules) {
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        else {
            styleElement.innerHTML = cssText;
        }

        document.getElementsByTagName('head')[0].appendChild(styleElement);
    }

    function _chartistScoll(chart) {

        var cssRules = [
            '#' + chart.container.id + ' { overflow-x: scroll; overflow-y: hidden; }',
            '#' + chart.container.id + '::-webkit-scrollbar {  width: ' + ((scrollbarOptions && scrollbarOptions.width) ? scrollbarOptions.width : '10px' ) +  '; height: ' + ((scrollbarOptions && scrollbarOptions.height) ? scrollbarOptions.height : '10px' ) +  '; background-color: #F5F5F5; }',
            '#' + chart.container.id + '::-webkit-scrollbar * { background: transparent; }',
            '#' + chart.container.id + '::-webkit-scrollbar-thumb { border-radius: 14px; -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); background: ' + ((scrollbarOptions && scrollbarOptions.scollbarColor) ? scrollbarOptions.scollbarColor + '!important' : 'rgba(0, 0, 0, 0.4) !important' ) +  '; }',
            '#' + chart.container.id + '::-webkit-scrollbar-track {  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); border-radius: 10px; background-color: ' + ((scrollbarOptions && scrollbarOptions.backgroundColor) ? scrollbarOptions.backgroundColor : '#F5F5F5' ) +  '; }',
        ];

        _writeStyles("_chartistStyles", cssRules);

    }

};