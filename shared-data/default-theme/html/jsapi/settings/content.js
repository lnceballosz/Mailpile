/* Settings - Shows profile add modal */
// SPDX-FileCopyrightText: 2011-2015  Bjarni R. Einarsson, Mailpile ehf and friends
// SPDX-License-Identifier: AGPL-3.0-or-later

$(document).on('click', '#btn-settings-profile-add', function(e) {
  Mailpile.UI.show_modal($("#modal-settings-profile-add").html());
});



/* Settings - Submit profile add form */
$(document).on('submit', '#form-settings-profile-add', function(e) {

  e.preventDefault();
  var profile_data = {
    name : $('#profile-add-name').val(),
    email: $('#profile-add-email').val()
  };

  var smtp_route = $('#profile-add-username').val() + ':' + $('#profile-add-password').val() + '@' + $('#profile-add-server').val() + ':' + $('#profile-add-port').val();

  if (smtp_route !== ':@:25') {
    profile_data.route = 'smtp://' + smtp_route;
  }

  // FIXME: this is currently g'borked
  // {profiles: JSON.stringify(profile_data)}
});


/* Settings - Shows route add modal */
$(document).on('click', '#btn-settings-route-add', function(e) {
  Mailpile.UI.show_modal($("#modal-settings-route-add").html());
});


$(document).on('submit', '#form-settings-route-add', function(e) {

  alert('This is not quite implemented yet :)');

});


/* Settings - Submit route edit form */
$(document).on('submit', '.form-settings-route-edit', function() {


});
