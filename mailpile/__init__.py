# SPDX-FileCopyrightText: 2011-2015  Bjarni R. Einarsson, Mailpile ehf and friends
# SPDX-License-Identifier: AGPL-3.0-or-later

from mailpile.i18n import gettext as _
from mailpile.i18n import ngettext as _n


__all__ = ['Mailpile',
           "app", "commands", "plugins", "mailutils", "search", "ui", "util"]


class Mailpile(object):
    """This object provides a simple Python API to Mailpile."""

    def __init__(self,
                 ui=None,
                 workdir=None,
                 session=None):
        import mailpile.app
        import mailpile.config.defaults
        import mailpile.ui
        if not session:
            ui = ui or mailpile.ui.UserInteraction
            self._config = mailpile.app.ConfigManager(
                workdir=workdir, rules=mailpile.config.defaults.CONFIG_RULES)
            self._session = mailpile.ui.Session(self._config)
            self._ui = self._session.ui = ui(self._config)
            self._session.config.load(self._session)
            self._session.main = True
        else:
            self._session = session
            self._config = session.config
            self._ui = session.ui

        for cls in mailpile.commands.COMMANDS:
            names, argspec = cls.SYNOPSIS[1:3], cls.SYNOPSIS[3]
            if names[0]:
                setattr(self, *self._mk_action(cls, names[0], argspec))
            if names[1] and (names[0] != names[1]):
                setattr(self, *self._mk_action(cls, names[1], argspec))

    def _mk_action(self, cls, cmd, argspec):
        import mailpile.commands
        if argspec:

            def fnc(*args, **kwargs):
                return mailpile.commands.Action(self._session, cmd, args,
                                                data=kwargs)
        else:

            def fnc(**kwargs):
                return mailpile.commands.Action(self._session, cmd, '',
                                                data=kwargs)

        fnc.__doc__ = '%s(%s)  # %s' % (cmd, argspec or '', cls.__doc__)
        return cmd.replace('/', '_'), fnc

    def Interact(self):
        import mailpile.util
        mailpile.util.QUITTING = False
        self._session.interactive = self._session.ui.interactive = True
        try:
            self._session.config.prepare_workers(self._session, daemons=True)
            mailpile.app.Interact(self._session)
        except KeyboardInterrupt:
            pass
        finally:
            mailpile.util.QUITTING = mailpile.util.QUITTING or True
            self._session.config.stop_workers()
            self._session.interactive = self._session.ui.interactive = False
