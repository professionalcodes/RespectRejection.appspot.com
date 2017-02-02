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
import stripe
import random
from google.appengine.ext import ndb

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
		donation_amount = self.request.get("donation_amount")
		StripeController.make_charge(stripe_token, donation_amount)
		try:
			pass
		except Exception, e:
			raise
		else:
			pass
		finally:
			pass

class StripeController(object):
	"""StripeController for encapsulating stripe functionality. """


	@classmethod
	def make_idempotency_key(cls):	 
		key = generate_random_string()
		while StripeDAO.contains_key(key):
			key = generate_random_string()
		return key 

	@classmethod
	def make_charge(cls, token, charge_amount, customer, currency_type, charge_description):
		charge = stripe.Charge.create(
  			amount=charge_amount,
  			currency=currency_type,
  			description=charge_description,
  			source=token,
  			idempotency_key=cls.make_idempotency_key()
		)
		logging.info(charge)
		
	@classmethod
	def set_test_key(cls):
		stripe.api_key = "sk_test_2SesnVyk4RA3wK2NabaftD4D"

	@classmethod
	def set_live_key(cls):
		stripe.api_key = "sk_live_VpvtryFaxqePRCXPsOwnmjD9"	

class StripeDAO(ndb.expando):
	idempotency_key = ndb.StringProperty()

	@classmethod
	def contains_key(cls, key):
		query = cls.query(idempotency_key == key)
		return query != None 

	@classmethod
	def store_charge(cls, charge):
		pass

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
		
def generate_random_string():
	string_length = 10
	string_from_which_created = string.digits + string.letters + string.digits
	return ''.join([string_from_which_created[random.randint(0, string_length)] for i in range(string_length)])

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
