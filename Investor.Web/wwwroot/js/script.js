$( document ).ready(function() {
/***data***/
var data=new Date();
var weekday=new Array(7);
weekday[0]="Неділя";
weekday[1]="Понеділок";
weekday[2]="Вівторок";
weekday[3]="Середа";
weekday[4]="Четвер";
weekday[5]="П'ятниця";
weekday[6]="Субота";
var day = weekday[data.getDay()];

var currentDate = data.toLocaleDateString();

//$("#data").html('<span class="day">'+day+'</span><span class="current-date">'+currentDate+'</span>');

$("#my-datepicker").val(day+' '+currentDate);
/***/
function numberPagination() {
    var windowSize = $(window).width();
    if (windowSize > 991) {
        number = 3;
    } else if(windowSize > 375){
        number = 2;
    } else{
        number = 1;
    }
}

numberPagination();
$(window).on('resize', numberPagination);

$('.slick-carousel').on('init', function () {
    $('.slick-carousel').css({visibility: 'visible'});
});

/****slider popular theme***/
    if($("div").is(".carousel-popular-theme")) {
        var $statusTheme = $('.paging-popular-theme');
        var $slickTheme = $('.carousel-popular-theme');

        $slickTheme.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + number;
            if (i > slick.slideCount) {
                $statusTheme.text(slick.slideCount + '/' + slick.slideCount);
            } else {
                $statusTheme.text(i + '/' + slick.slideCount);
            }
        });

        $slickTheme.slick({
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
/*******/

/***slider editorial choice***/
    if($("div").is(".carousel-editorial-choice")) {
        var $statusChois = $('.paging-editorial-choice');
        var $slickChois = $('.carousel-editorial-choice');

        $slickChois.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            var i = (currentSlide ? currentSlide : 0) + number;
            if (i > slick.slideCount) {
                $statusChois.text(slick.slideCount + '/' + slick.slideCount);
            } else {
                $statusChois.text(i + '/' + slick.slideCount);
            }
        });

        $slickChois.slick({
            infinite: false,
            speed: 300,
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
/********/
    if($("div").is(".carousel-top-blog")){
var $slickBlog = $('.carousel-top-blog');
var $statusBlog = $('.paging-blog');

    $slickBlog.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + number;
        if(i>slick.slideCount){
            $statusBlog.text(slick.slideCount + '/' + slick.slideCount);
        } else {
            $statusBlog.text(i + '/' + slick.slideCount);
        }
    });

    $slickBlog.slick({
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    };
});

/*
$(document).on('change', '.btn-file :file', function() {
  var input = $(this),
  label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
  input.trigger('fileselect', [label]);
});

$('.btn-file :file').on('fileselect', function(event, label) {

  var input = $(this).parents('.input-group').find(':text'),
  log = label;

  if( input.length ) {
    input.val(log);
  } else {
    if( log ) alert(log);
  }

});
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $('#img-upload').attr('style', 'background-image: url('+e.target.result+');');
    }

    reader.readAsDataURL(input.files[0]);
  }
}

$("#imgInp").change(function(){
  readURL(this);
}); */

/***preview registration***/
$('.input-value').keyup(function(){
  var $this = $(this);
  var text = $this.val();
  $('.'+$this.attr('id')+'').html($this.val()); 

    if( text.length  > 1){
      $('.'+$this.attr('id')+'').prev('i').removeClass('d-none'); 
    }else if(text.length  < 1){
      $('.'+$this.attr('id')+'').prev('i').addClass('d-none');
  }

     var name = $('#input-value-name').val();
  if(name.length  < 1){
      $('.input-value-name').html('Ім’я');
  }


  var lastname = $('#input-value-lastname').val();
  if(lastname.length  < 1){
      $('.input-value-lastname').html('Прізвище');
  }

  var autobiography = $('#input-value-autobiography').val();
  if(autobiography.length  < 1){
      $('.input-value-autobiography').html('Ваша біографія');
  }
});
/***end preview registration***/

/***number of description lines***/
 $('.item-blog-news').each(function(){
    var blog = $(this);
    var heightTitle = blog.find('.title-news').height();

    if(heightTitle < 19){
      blog.find('.text-news').removeClass('brief-description');
     }
   }); 
/***end number of description lines***/

 /***blog number of description lines***/
  $('.item-all-news').each(function(){
     var blog = $(this);
     var heightTitle = blog.find('.title-news').height();

     if(heightTitle < 19){
       blog.find('.text-news').removeClass('brief-description');
      }
    });
/***end number of description lines***/

/***remove disable class***/
      $('.btn-edit').click(function(){
         var nameData = $(this).parents('.block-edit').data('edit'); 
         var findForm = $('.edit-'+nameData).find('.form-control');

          var btnUpload = $('.edit-'+nameData).find('.upload-result');
          var fileUpload = $('.edit-'+nameData).find('#upload');



        $('.edit-'+nameData).find('button.btn-edit').attr('hidden', 'hidden');
        $('.edit-'+nameData).find('button[type="submit"]').removeAttr('hidden');


        if($(findForm).hasClass("disabled")){
          findForm.removeClass('disabled');
          findForm.removeAttr('disabled readonly');
          btnUpload.removeAttr('disabled');
          fileUpload.removeAttr('disabled');
        }

      });
/*****/

    $(function($) {
     var path = window.location.href;
     $('.navbar-nav a').each(function() {
      if (this.href === path) {
       $(this).parent().addClass('active');
      }
     });
    });
/*******************/

if($("div").is(".grid")){
    $('.grid').masonry({
        itemSelector: '.grid-item'
    });
};


/***editor***/
if($("textarea").is(".textarea")) {
    tinymce.init({
        selector: '.textarea',
        language: 'uk_UA'
    });
}
/******/


/***/
if ($("div").is("#upload-demo")) {

    var cropper = (function () {


        function popupResult(result) {
            if (result.src) {
                $('#img-upload').attr('style', 'background-image: url(' + result.src + ');');
            }
        }


        function demoUpload() {
            var $uploadCrop;

            function readFile(input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $('.upload-demo').addClass('ready');
                        $uploadCrop.croppie('bind', {
                            url: e.target.result
                        }).then(function () {

                        });

                    }

                    reader.readAsDataURL(input.files[0]);
                }
                else {
                    swal("Sorry - you're browser doesn't support the FileReader API");
                }
            }

            $uploadCrop = $('#upload-demo').croppie({
                viewport: {
                    width: 100,
                    height: 100,
                    type: 'circle'
                },
                enableExif: true
            });

            $('#upload').on('change', function () {
                readFile(this);
            });
            $('.upload-result').on('click', function (ev) {
                $uploadCrop.croppie('result', {
                    type: 'canvas',
                    size: 'viewport'
                }).then(function (resp) {
                    popupResult({
                        src: resp
                    });
                });
            });
        };


        function init() {
            demoUpload();
        };

        return {
            init: init
        };

    })();

    cropper.init();
};
/***/

/***datepicker***/
if($("input").is(".my-datepicker")) {
    $.fn.datepicker.language['ua'] = {
        days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"],
        daysShort: ["Нед", "Пон", "Вів", "Сер", "Чет", "П'ят", "Суб"],
        daysMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'],
        monthsShort: ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Чер', 'Лип', 'Серп', 'Вер', 'Жов', 'Лсит', 'Гру'],
        today: 'Сьогодні',
        clear: 'Очистити',
        dateFormat: 'DD dd.mm.yyyy',
        timeFormat: 'hh:ii',
        firstDay: 1
    }

    $('.my-datepicker').datepicker({
        language: 'ua'
    });
}
/***end datepicker***/

/***/
if($("form").is(".validate")) {
    var myLanguage = {
        errorTitle: 'Не вдалося надіслати форму!',
        requiredFields: 'Ви не заповнили всі обов’язкові поля',
        badTime: 'Введено некоректний час',
        badEmail: 'Введено некоректний email',
        badTelephone: 'Введено неправильний номер телефону',
        badSecurityAnswer: 'Ви ввели неправильну відповідь на секретне запитання',
        badDate: 'Введено некоректну дату',
        lengthBadStart: 'Введене значення повинне бути між ',
        lengthBadEnd: ' символи',
        lengthTooLongStart: 'Введене значення більше ніж ',
        lengthTooShortStart: 'Введене значення менше ніж ',
        notConfirmed: 'Введені значення не можуть бути підтверджені',
        badDomain: 'Некоректне ім’я домену',
        badUrl: 'Некоректне URL значення',
        badCustomVal: 'Введено некоректне значення',
        andSpaces: ' і пробіли ',
        badInt: 'Введене значення не є коректним числом',
        badSecurityNumber: 'Your social security number was incorrect',
        badUKVatAnswer: 'Incorrect UK VAT Number',
        badStrength: 'Пароль є занадто слабким',
        badNumberOfSelectedOptionsStart: 'Виберіть принаймні ',
        badNumberOfSelectedOptionsEnd: ' відповіді',
        badAlphaNumeric: 'Введені значення мають бути лише алфавітними символами ',
        badAlphaNumericExtra: ' і ',
        wrongFileSize: 'Файл, який ви намагаєтесь завантажити занадто великий (макс. %s)',
        wrongFileType: 'Тільки файли типу %s  є дозволеними',
        groupCheckedRangeStart: 'Будь ласка, виберіть між ',
        groupCheckedTooFewStart: 'Будь ласка, виберіть принаймні ',
        groupCheckedTooManyStart: 'Будь ласка, виберіть максимум з ',
        groupCheckedEnd: ' item(s)',
        badCreditCard: 'Номер кредитної карти є некоректним',
        badCVV: 'The CVV number was not correct',
        wrongFileDim: 'Некоретне розширення зображення,',
        imageTooTall: 'зображення не може бути вище, ніж',
        imageTooWide: 'зображення не може бути ширше, ніж',
        imageTooSmall: 'зображення занадто мале',
        min: 'мін',
        max: 'макс',
        imageRatioNotAccepted: 'Співвідношення зображення не є прийнятним'
    };

    $.validate({
        language: myLanguage,
        modules: 'security',
        onModulesLoaded: function () {
            var optionalConfig = {
                fontSize: '12pt',
                padding: '7px',
                bad: '',
                weak: '',
                good: '',
                strong: ''
            };

            $('input[name="pass_confirmation"]').displayPasswordStrength(optionalConfig);
        }
    });
};
/****/
