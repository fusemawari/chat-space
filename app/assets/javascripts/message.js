$(function(){
  function buildHTML(message){
    var image_url = (message.image_url)? `<image class="lower-message_image" src="${message.image_url}">`:"";
    var html = `<ul class="messages">
                  <li class="messages__list">
                    <span class="messages__name">${ message.name }
                    </span>
                    <span class="messages__date">${ message.time }</span>
                  </li>
                  <li class="messages__list">
                    <span class="messages__list__message">
                    ${ message.content }
                    ${ message.image == null ? "" : '<img src="' + message.image + '">' }
                    </span>
                  </li>
                </ul>`
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

