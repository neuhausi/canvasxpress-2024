import './prepare';
// import Vue from 'vue';
import AOS from 'aos';
import './mrare/fade-page';
// import './mrare/dropdown-grid';
// import './mrare/prism';
import SmoothScroll from 'smooth-scroll';
import Typed from 'typed.js';
import { each } from 'jquery';
// import SVGInjector from 'svg-injector';

$(document).ready(function () {

  if ($('.typed-npm').length) {
    new Typed('.typed-npm', {
      strings: ['npm install canvasxpress'],
      typeSpeed: 80
    })
  }

  // Setup anchor link scrolling
  new SmoothScroll('a[href*="#"].smooth-scroll', {
    offset: 100,
  });

  // SVG Injector

  // SVGInjector($('.inject-me'));

  // Setup AOS
  AOS.init({
    once: true,
  });

  // setup loading animation
  window.addEventListener("load", function () {
    document.querySelector('body').classList.add('loaded');
  });

  /**
   * Back to top button
   */
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $('#back-to-top').fadeIn();
    } else {
      $('#back-to-top').fadeOut();
    }
  });

  // scroll body to 0px on click
  $('#back-to-top').click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
    return false;
  });

  // Buttons on the broadcast page
  $('#broadcast-highlight').click(function () {
    var cxs = CanvasXpress.instances;
    for (var i = 0; i < cxs.length; i++) {
      cxs[i].selectionMode = 'highlight';
    }
    cxs[0].broadcastDraw();
  });
  $('#broadcast-ghost').click(function () {
    var cxs = CanvasXpress.instances;
    for (var i = 0; i < cxs.length; i++) {
      cxs[i].selectionMode = 'ghost';
    }
    cxs[0].broadcastDraw();
  });
  // Buttons on the broadcast page
  $('#broadcast-name').click(function () {
    var cxs = CanvasXpress.instances;
    for (var i = 0; i < cxs.length; i++) {
      cxs[i].selectionMode = 'name';
    }
    cxs[0].broadcastDraw();
  });
  // Buttons on the broadcast page
  $('#broadcast-filter').click(function () {
    var cxs = CanvasXpress.instances;
    for (var i = 0; i < cxs.length; i++) {
      cxs[i].selectionMode = 'filter';
    }
    cxs[0].broadcastDraw();
  }); 

  /**
   * Button in page
   */
  $('body').on('click', '.btn-code', function (e) {
    var cX = CanvasXpress.$(this.attributes.cxid.value) || CanvasXpress.instances[0];
    if (cX) {
      switch (this.attributes.cxcode.value) {
        case 'js':
          var cd = '<pre class="CanvasXpressCodeContent">\n' + cX.getCodeJSONJS(true) + '\n</pre>';
          cX.showTooltipDiv(false, cd, false, {
            width: '500px',
            maxHeight: '500px',
            overflow: 'auto',
            margin: '18px'
          }, 25, 25);
          break;
        case 'fiddle':
          cX.editJSFiddle(e, true);
          break;
        case 'codepen':
          cX.editCodePen(e, true);
          break;
        case 'r':
          var cd = '<pre class="CanvasXpressCodeContent">\n' + cX.dataToR() + '\n</pre>';
          cX.showTooltipDiv(false, cd, false, {
            width: '500px',
            maxHeight: '500px',
            overflow: 'auto',
            margin: '18px'
          }, 25, 25);
          break;
        case 'python':
          var cd = '<pre class="CanvasXpressCodeContent">\n' + cX.dataToPython() + '\n</pre>';
          cX.showTooltipDiv(false, cd, false, {
            width: '500px',
            maxHeight: '500px',
            overflow: 'auto',
            margin: '18px'
          }, 25, 25);
          break;
        case 'jupyter':
          var cd = '<pre class="CanvasXpressCodeContent">\n' + cX.dataToPython(true) + '\n</pre>';
          cX.showTooltipDiv(false, cd, false, {
            width: '500px',
            maxHeight: '500px',
            overflow: 'auto',
            margin: '18px'
          }, 25, 25);
          break;
        case 'data':
          cX.clickView();
          break;
        case 'explore':
          cX.clickLayout();
          break;
        case 'customize':
          cX.clickDataCustomizer();
          break;
      }
    }
  });

  /**
   * Theme
   */
  $('body').on('click', '.btn-theme', function (e) {
    for (var i = 0; i < CanvasXpress.instances.length; i++) {
      var cX = CanvasXpress.instances[i];
      cX.changeTheme(this.attributes.cxtheme.value);
    }
  });

  /**
   * Font
   */
   $('body').on('click', '.btn-font', function (e) {
    for (var i = 0; i < CanvasXpress.instances.length; i++) {
      var cX = CanvasXpress.instances[i];
      cX.changeAttribute('fontName', this.attributes.cxfont.value);
    }
  });

  /**
   * Style
   */
  $('body').on('click', '.btn-param', function (e) {
    for (var i = 0; i < CanvasXpress.instances.length; i++) {
      var cX = CanvasXpress.instances[i];
      var ob = JSON.parse(this.attributes.cxfunc.value);
      for (var j = 0; j < ob.length; j++) {
        var fn = ob[j][0];
        var pr = ob[j][1];
        cX[fn].apply(cX, pr);
      }
    }
  });

  /**
   * API
   */
  $('body').on('click', '.btn-api', function (e) {
    var p = this.attributes.cxapi.value;
    $('#' + p + '-cX-API-Row')[0].style.display = 'block';
    var cXi = CanvasXpress.instances;
    if (cXi.length) {
      var ex = cXi[0].getExamplesDocObject(p);
      var id = ex[0][0];
      var cXii = cXi[0].$(id);
      if (cXii) {
        return;
      }
    }
    var cX = new CanvasXpress({
      renderTo: (p + "-cX-API-Hidden"),
      hidden: true
    });
    cX.stopEvent(e);
    cX.cancelEvent(e);
    cX.clickExamplePropertyDescription(e, p, true);
  });

  $('body').on('click', '.btn-close-api', function (e) {
    var p = this.attributes.cxapi.value;
    $('#' + p + '-cX-API-Row')[0].style.display = 'none';
  });

  /**
   * Other graphs
   */
  $('body').on('click', '.ajax-link', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#centerPanel").html('<div class="loader d-flex flex-column"><img src="/assets/images/logo-square.svg" style="width: 30%;margin: auto;" class="pulse" alt=""></div>');
    var url = CanvasXpress.factory.services;
    var data = {
      service: 'retrieve',
      html: this.attributes.cxhtml.value
    }
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      pageId: this.attributes.cxhtml.value,
      success: function (e) {
      CanvasXpress.destroy();
        $('#centerPanel').html($(e).html() || e);
        var cx = CanvasXpress.instances[0];
        if (cx) {
          var id = cx.target.replace(/(\d+)/, '-$1');
          var el = $('#' + id);
          var tt = el.text().replace('# ', '');
          $('#centerPanelId').attr("href", '#' + id);
          $('#centerPanelId').html(tt);
          PR.prettyPrint();
        }
        $('body,html').animate({
          scrollTop: 0
        }, 400);
      },
      error: function (e) {

      }
    });
  });

  /**
   * Other Logs
   */
  $('body').on('click', '.ajax-link-log', function (e) {
    e.preventDefault();
    e.stopPropagation();
    CanvasXpress.destroy(CanvasXpress.instances[0]);
    var p = $('#CanvasXpress-ParentNode-canvasUsage').parent();
    var c = "<canvas id='canvasUsage' class='CanvasXpress' width='600' height='900' data-responsive='true' data-aspectRatio='2:3'></canvas>";
    var n = $ ("<div class='canvas-site'>" + c + "</div>");
    $('#CanvasXpress-ParentNode-canvasUsage').remove();
    p.append(n);
    new CanvasXpress('canvasUsage', this.attributes.cxhtml.value);
  });

  /**
   * Contact Form
   */
  $("#domain-form").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var url = $(this).attr("action");
    var data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function (e) {
        CanvasXpress.destroy(CanvasXpress.instances[0]);
        var p = $('#CanvasXpress-ParentNode-canvasUsage').parent();
        var c = "<canvas id='canvasUsage' class='CanvasXpress' width='600' height='900' data-responsive='true' data-aspectRatio='2:3'></canvas>";
        var n = $ ("<div class='canvas-site'>" + c + "</div>");
        $('#CanvasXpress-ParentNode-canvasUsage').remove();
        p.append(n);
        new CanvasXpress(e);
      },
      error: function (e) {

      }
    });
    return;
  });

  // Site

  /**
   * Contact Form
   */
  $("#contact-form").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var url = $(this).attr("action");
    var data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function (e) {
        $("#contact-form-error").hide();
        $("#contact-form-success").show();
        setTimeout(function () {
          $("#contact-form").trigger("reset");
          $("#contact-form-success").hide();
        }, 3500)
      },
      error: function (e) {
        $("#contact-form-success").hide();
        $("#contact-form-error").show();
      }
    });
    return;
  });

  /**
   * Account Forms
   */
  $(".site-form").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    var url = $(this).attr("action");
    var data = $(this).serialize();
    var id = this.id;
    $.ajax({
      type: "POST",
      url: url,
      data: data,
      formId: id,
      dataType: 'json',
      success: function (e) {
        var f = $("#" + this.formId);
        var i = f.attr('id');
        if (e.status == "success") {
          if (i == 'login-form') {
            setCookie("canvasXpressUserId", e.message);
            $('#account').modal('hide');
          } else if (e && e != '') {
            $("#" + i + "-success").html(e.message);
            $("#" + i + "-error").hide();
            $("#" + i + "-success").show();
            if (i == 'register-form') {
              setCookie("canvasXpressUserId", e.data);
            }
            setTimeout(function () {
              $("#" + i).trigger("reset");
              $("#" + i + "-success").hide();
              $('#account').modal('hide');
              $('#social').modal('hide');
            }, 3500);
          } else {
            $('#account').modal('hide');
            $('#social').modal('hide');
          }
        } else {
          $("#" + i + "-error").html(e.message);
          $("#" + i + "-success").hide();
          $("#" + i + "-error").show();
          setTimeout(function () {
            $("#" + i).trigger("reset");
            $("#" + i + "-error").hide();
            $('#account').modal('hide');
            $('#social').modal('hide');
          }, 3500);
        }
      },
      error: function (e) {
        var f = $("#" + this.formId);
        var i = f.attr('id');
        $("#" + i + "-error").html("Ooops! Something went wrong!");
        $("#" + i + "-success").hide();
        $("#" + i + "-error").show();
        setTimeout(function () {
          $("#" + i).trigger("reset");
          $("#" + i + "-error").hide();
          $('#account').modal('hide');
          $('#social').modal('hide');
        }, 3500);
      }
    });
  });

  /**
   * Load the available logs
   *
   * @returns void
   */
  var loadLogs = function () {
    var ul = $('#usageLogs');
    if (ul.length) {
      console.log("Loading logs...");
      $.ajax({
        type: "POST",
        url: ul.attr('data-action'),
        data: ul.attr('data-service'),
        dataType: 'json',
        success: function (e) {
          console.log(e.message);
          if (e.status == "success") {
            var u = $('#usageLogs');
            var l = $('#logs');
            var s = u.attr('data-action').replace('/cgi-bin/services.pl', '');
            if (e.data) {
              u.empty();
              l.empty();
              var k = Object.keys(e.data).sort(function (a, b) {
                return e.data[b].order - e.data[a].order;
              });
              var z = e.data[k[0]].name.replace(/^\.\./, s) + '.json';
              u.append('<a href="#" class="d-block ajax-link-log" role="button" cxhtml="' + z + '">' + k[0] + '</a>');
              for (var i = 0; i < k.length; i++) {
                if (i < 100) {
                  var w = e.data[k[i]].name.replace(/^\.\./, s) + '.json';
                  l.append('<a href="#" class="d-block ajax-link-log" role="button" cxhtml="' + w + '">' + k[i] + '</a>');
                }
              }
              new CanvasXpress('canvasUsage', z);
            }
          }
        },
        error: function (e) {
          console.log('Ooops! Something went wrong!');
        }
      });
    }
  }

  /**
   * Show Register Form
   * 
   * @returns void
   */
  $('#showRegisterForm').on('click', function () {
    $('#login').fadeOut('fast', function () {
      $('#forgot').fadeOut('fast');
      $('#register').fadeIn('fast');
      $('#create-forgot-footer').fadeOut('fast', function () {
        $('#login-footer').fadeIn('fast');
      });
    });
    $('.modal-title').html('Register with');
    $('.error').removeClass('alert alert-danger').html('');
  });

  /**
   * Show Login Form
   * 
   * @returns void
   */
  $('#showLoginForm').on('click', function () {
    unsetCookie("canvasXpressUserId");
    //$('#social').fadeIn('fast');
    $('#register').fadeOut('fast', function () {
      $('#logout').fadeOut('fast');
      $('#forgot').fadeOut('fast');
      $('#login').fadeIn('fast');
      $('#login-footer').fadeOut('fast', function () {
        $('#create-forgot-footer').fadeIn('fast');
      });
    });
    $('.modal-title').html('Login with');
    $('.error').removeClass('alert alert-danger').html('');
  });

  /**
   * Show Forgot Form
   * 
   * @returns void
   */
  $('#showForgotForm').on('click', function () {
    //$('#social').fadeOut('fast');
    $('#login').fadeOut('fast', function () {
      $('#register').fadeOut('fast');
      $('#forgot').fadeIn('fast');
      $('#create-forgot-footer').fadeOut('fast', function () {
        $('#login-footer').fadeIn('fast');
      });
    });
    $('.modal-title').html('Enter email');
    $('.error').removeClass('alert alert-danger').html('');
  });

  /**
   * Set Cookie
   * 
   * @returns void
   */
  var setCookie = function (cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    checkCookie(cname);
  }

  /**
   * Unset Cookie
   * 
   * @returns void
   */
  var unsetCookie = function (cname) {
    var d = new Date();
    d.setTime(d.getTime() + 1);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=;" + expires + ";path=/";
    checkCookie(cname);
  }

  /**
   * Get Cookie
   *
   * @returns void
   */
  var getCookie = function (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  /**
   *
   * Toggle the Account modal
   *
   * @return void
   */
  var toggleModal = function () {
    $("#accountGlyph").off("click", toggleModal);
    unsetCookie("canvasXpressUserId");
  }

  /**
   * Check Cookie
   *
   * @returns void
   */
  var checkCookie = function (cname) {
    var val = getCookie(cname);
    var nav = "";
    if (val != "") {
      nav = val.split('::')[0];
      $("#siteUserId").text(nav);
      $("#accountGlyph").attr("title", "Logout");
      $("#accountGlyph").on("click", toggleModal);
      $('#toggleLogin').removeAttr("data-toggle");
    } else {
      nav = "";
      $("#siteUserId").text(nav);
      $("#accountGlyph").attr("title", "Login");
      $('#toggleLogin').attr("data-toggle", "modal");
    }
  }

  checkCookie("canvasXpressUserId");
  loadLogs();

});
