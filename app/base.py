# -*- coding: utf-8 -*-
"""
App Request Handler
"""

import webapp2
from webapp2 import cached_property

import config


def jinja2_factory(app):
    from webapp2_extras import jinja2
    jinja_config = dict(jinja2.default_config)
    jinja_config['template_path'] = config.TEMPLATES_DIR
    j = jinja2.Jinja2(app, jinja_config)
    j.environment.filters.update({
    })
    j.environment.globals.update({
        'uri_for': webapp2.uri_for,
    })
    return j


class RequestHandler(webapp2.RequestHandler):
    
    @cached_property
    def jinja2(self):
        from webapp2_extras import jinja2
        return jinja2.get_jinja2(factory=jinja2_factory)
    
    def render_response(self, template, **kwds):
        result = self.jinja2.render_template(template, **kwds)
        self.response.write(result)
