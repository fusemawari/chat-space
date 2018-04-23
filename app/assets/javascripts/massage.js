$(function(){
  function buildHTML(message){
    var html = `<ul class="messages" data-id="${message.id}">
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
      $('.form__message').val('');
      $('.hidden').val('')
      $('.form__submit').attr('disabled',false);
      $('.message').animate({scrollTop: $('.message')[0].scrollHeight }, 1000);
      })
    .fail(function(data){
      alert('入力してください');
      $(".form__submit").attr("disabled",false);
    });
  });


  var interval = setInterval(function(){
    var lastId = $('.messages:last').data('id');
    var url = window.location.href;
    if (url.match(/\/groups\/\d+\/messages/)){
    $.ajax({
      type: "GET",
      url: url,
      data: { id: lastId },
      dataType: 'json'
    })
    .done(function(data){
      var html = ""
      data.forEach(function(message){
        if (message.id > lastId){
          html += buildHTML(message);
          $('.message').append(html);
        }
        $('.message').animate({scrollTop: $('.message')[0].scrollHeight }, 1000);
       })
      })
    .fail(function(data) {
      alert('error');
    });
  } else {
    clearInterval(interval);
  }}, 5000);



});
