/* Modals - Contacts */
// SPDX-FileCopyrightText: 2011-2015  Bjarni R. Einarsson, Mailpile ehf and friends
// SPDX-License-Identifier: AGPL-3.0-or-later

Mailpile.UI.Modals.ContactAdd = function() {
  $('.sub-navigation ul li').removeClass('navigation-on');
  $(this).addClass('navigation-on');

  Mailpile.API.with_template('modal-contact-add', function(modal) {
    var modal_data = { name: '', address: '', extras: '' };
    Mailpile.UI.show_modal(modal(modal_data));
  });
};


Mailpile.UI.Modals.ContactAddProcess = function() {
  Mailpile.API.contacts_add_post($('#form-contact-add').serialize(), function(result) {
    if (result.status == 'success') {
      Mailpile.UI.hide_modal();

      // If Contacts List
      var $clist = $('#contacts-list');
      if ($clist.length > 0) {
        var contact_template = Mailpile.safe_template($('#template-contact-list-item').html());
        var contact_html = contact_template(result.result.contact);
        $clist.append(contact_html);
      }
    }
  });
};
