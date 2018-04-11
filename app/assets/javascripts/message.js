$(function(){
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<ul class="message">
                  <li class="messages__list">
                    <span class="messages__date">${ message.name }
                    </span>
                    <div class="upper-message__date">
                    <p>${ message.created_at }</p>
                    </div>
                  </div>
                  <div class="lower-meesage">
                    <p class="lower-message__content">
                    <p>${ message.content }</p>
                    ${ message.image == null ? "" : '<img src="' + message.image + '">' }
                    </p>
                  </div>
              </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('.form_message').val('');
      $('.hidden').val('')
      $('.form__submit').attr('disabled',false);
      $('.message').animate({scrollTop: $('.message')[0].scrollHeight }, 1000);
      })
    .fail(function(data){
      alert('入力してください');
      $(".form__submit").attr("disabled",false);
    })
  });
});

