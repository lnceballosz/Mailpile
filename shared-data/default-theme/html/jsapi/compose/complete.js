/* Compose - Complete */

// SPDX-FileCopyrightText: 2011-2015  Bjarni R. Einarsson, Mailpile ehf and friends
// SPDX-License-Identifier: AGPL-3.0-or-later

Mailpile.Composer.Complete = function(mid) {
  Mailpile.go(Mailpile.urls.message_sent + mid + "/");
};
