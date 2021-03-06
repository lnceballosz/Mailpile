/* Composer - Body */

// SPDX-FileCopyrightText: 2011-2015  Bjarni R. Einarsson, Mailpile ehf and friends
// SPDX-License-Identifier: AGPL-3.0-or-later

Mailpile.Composer.Model = function(strings, addresses) {
  var model = strings;
  model["addresses"] = addresses;
  return model;
};


Mailpile.Composer.Body.Setup = function(mid) {

  // Add Autosize
  autosize($('#compose-text-' + mid));

  // Is Ephemeral (means .compose-text has quoted_reply)
  if (/\breply-all\b/g.test(mid)) {

    console.log('Is Ephemeral');

    // Add Quoted to Model
    Mailpile.Composer.Drafts[mid].quoted_reply = $('#compose-text-' + mid).val();

    // If Quoted Reply disabled, remove from field
    if ($('#compose-quoted-reply-' + mid).parent().data('quoted_reply') === 'disabled') {
      $('#compose-text-' + mid).val('').trigger('autosize:update');
    }
    // Not disabled, add to model
    else {
      Mailpile.Composer.Drafts[mid].body = $('#compose-text-' + mid).val();
    }
  }
  // Is Draft add to model
  else {

    console.log('Is Not Ephemeral');

    Mailpile.Composer.Drafts[mid].body = $('#compose-text-' + mid).val();
  }
};


Mailpile.Composer.Body.QuotedReply = function(mid, state) {

  $checkbox = $('#compose-quoted-reply-' + mid);

  if ($checkbox.is(':checked')) {
    $checkbox.val('yes');
  }
  else {
    $checkbox.val('no');

    // Check Quoted Setting State
    if (state === 'unset' && Mailpile.Composer.Drafts[mid].quoted_reply) {
      Mailpile.Composer.Body.QuotedReplySetup();
      $('#compose-text-' + mid).val('').trigger('autosize:update');
    }
    // Empty body & .compose-text as it's just a quoted reply
    else if (Mailpile.Composer.Drafts[mid].body === Mailpile.Composer.Drafts[mid].quoted_reply) {
      Mailpile.Composer.Drafts[mid].body = '';
      $('#compose-text-' + mid).val('').trigger('autosize:update');
    }
    // Replace composer with quoted reply
    else if (Mailpile.Composer.Drafts[mid].quoted_reply) {
      Mailpile.Composer.Drafts[mid].body = Mailpile.Composer.Drafts[mid].quoted_reply;
      $('#compose-text-' + mid).val(Mailpile.Composer.Drafts[mid].quoted_reply).trigger('autosize:update');
    }
  }
};


Mailpile.Composer.Body.QuotedReplySetup = function() {
  Mailpile.API.with_template('modal-compose-quoted-reply', function(modal) {
    Mailpile.UI.show_modal(modal());
  });
};
