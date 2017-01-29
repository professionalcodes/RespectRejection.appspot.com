# Copyright 2016 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import webapp2
import os
import jinja2
import re
import random
import pickle
import string
import json
import logging

template_dir = os.path.join(os.path.dirname(__file__), 'jinja_templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir), autoescape = True)

class MainHandler(webapp2.RequestHandler):

	def write(self, *args, **kwargs):
		self.response.out.write(*args, **kwargs)

	def render_str(self, template, **params):
		t = jinja_env.get_template(template)
		return t.render(params)

	def render(self, template, **kwargs):
		self.write(self.render_str(template, **kwargs))


class Homepage(MainHandler):
	def get(self):
		self.render("base_template.html")		

	def post(self):
		pass

class Donate(MainHandler):
	def get(self):
		pass

	def post(self):
		stripe_token = self.request.get("token")
		logging.info(stripe_token)
		
class DeAuthFB(MainHandler):
	def get(self):
		pass

	def post(self):
		pass
		
class About(MainHandler):
	def get(self):
		self.render("about.html")

class Contact(MainHandler):
	def get(self):
		self.render("contact.html")

class Profile(MainHandler):
	def get(self):
		self.render("profile.html")

class LoggedInHeader(MainHandler):
	def get(self):
		self.render("logged_in_header.html")

class NotLoggedInHeader(MainHandler):
	def get(self):
		self.render("not_logged_in_header.html")

class LoggedInBody(MainHandler):
	def get(self):
		self.render("logged_in_body.html")

class NotLoggedInBody(MainHandler):
	def get(self):
		self.render("not_logged_in_body.html")

app = webapp2.WSGIApplication([
    ('/', Homepage),
    ('/about', About),
    ('/contact', Contact),
    ('/profile', Profile),
    ('/logged_in_header', LoggedInHeader),
    ('/not_logged_in_header', NotLoggedInHeader),
    ('/not_logged_in_body', NotLoggedInBody),
    ('/logged_in_body', LoggedInBody),
    ('/deauthfb', DeAuthFB),
    ('/donate', Donate),
], debug=True)
