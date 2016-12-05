import reduce from 'lodash/reduce';

export default http => ({
	getTranslations: locale =>
		http.get(`/translations/${locale}`),

	destroySession: () =>
		http.del('/authorization/token'),

	getFaxlines: userId =>
		http.get(`/${userId}/faxlines`),

	getFaxlineNumbers: (userId, faxlineId) =>
		http.get(`/${userId}/faxlines/${faxlineId}/numbers`),

	setFaxlineAlias: (userId, faxlineId, alias) =>
		http.put(`/${userId}/faxlines/${faxlineId}`, { alias }),

	setFaxlineTagline: (userId, faxlineId, tagline) =>
		http.put(`/${userId}/faxlines/${faxlineId}/tagline`, { value: tagline }),

	getFaxlineCallerId: (userId, faxlineId) =>
		http.get(`/${userId}/faxlines/${faxlineId}/callerid`),

	setFaxlineCallerId: (userId, faxlineId, callerId) =>
		http.put(`/${userId}/faxlines/${faxlineId}/callerid`, { value: callerId }),

	getPhonelines: userId =>
		http.get(`/${userId}/phonelines`),

	setPhonelineAlias: (userId, phonelineId, alias) =>
		http.put(`/${userId}/phonelines/${phonelineId}`, { alias }),

	getPhonelineDevices: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/devices`),

	getPhonelineForwardings: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/forwardings`),

	getPhonelineNumbers: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/numbers`),

	getPhonelineParallelforwardings: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/parallelforwardings`),

	createPhonelineParallelforwarding: (userId, phonelineId, alias, destination) =>
		http.post(`/${userId}/phonelines/${phonelineId}/parallelforwardings`, { alias, destination, active: true }),

	setPhonelineParallelforwarding: (userId, phonelineId, parallelforwardingId, parallelforwarding) =>
		http.put(`/${userId}/phonelines/${phonelineId}/parallelforwardings/${parallelforwardingId}`, parallelforwarding),

	getPhonelineVoicemails: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/voicemails`),

	getPhonelineVoicemailGreetings: (userId, phonelineId, voicemailId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/voicemails/${voicemailId}/greetings`),

	setVoicemail: (userId, phonelineId, voicemailId, active, timeout, transcription) =>
		http.put(
			`/${userId}/phonelines/${phonelineId}/voicemails/${voicemailId}`,
			{ timeout, active, transcription },
		),

	getUser: userId =>
		http.get(`/users/${userId}`),

	activateGreeting: (userId, phonelineId, voicemailId, greetingId) =>
		http.put(
			`/${userId}/phonelines/${phonelineId}/voicemails/${voicemailId}/greetings/${greetingId}`,
			{ active: true },
		),

	createGreeting: (userId, phonelineId, voicemailId, filename, base64Content) =>
		http.post(
			`/${userId}/phonelines/${phonelineId}/voicemails/${voicemailId}/greetings`,
			{ filename, base64Content },
		),

	deleteGreeting: (userId, phonelineId, voicemailId, greetingId) =>
		http.del(`/${userId}/phonelines/${phonelineId}/voicemails/${voicemailId}/greetings/${greetingId}`),

	changeForwarding: (userId, phonelineId, forwardings) =>
		http.put(
			`/${userId}/phonelines/${phonelineId}/forwardings`,
			{ forwardings },
		),

	setDnd: (deviceId, dnd) =>
		http.put(`/devices/${deviceId}`, { dnd }),

	setDeviceAlias: (deviceId, alias) =>
		http.put(`/devices/${deviceId}/alias`, { value: alias }),

	resetDevicePassword: deviceId =>
		http.post(`/devices/${deviceId}/credentials/password`),

	getDevices: () =>
		http.get('/devices'),

	getTacs: () =>
		http.get('/app/tacs'),

	acceptTacs: () =>
		http.put('/app/tacs', { accepted: true }),

	fetchLinks: () =>
		http.get('/app/links'),

	getHistory: (userId, phonelineId, types, directions, limit) => {
		let url = `/${userId}/history?phonelineId=${phonelineId}&limit=${limit}`;
		url += reduce(types, (joined, type) => `${joined}&types=${type}`, '');
		url += reduce(directions, (joined, direction) => `${joined}&directions=${direction}`, '');

		return http.get(url);
	},

	deleteHistoryEntry: (userId, id) =>
		http.del(`/${userId}/history/${id}`),

	getEvents: () =>
		http.get('/app/events'),

	deleteEvent: id =>
		http.del(`/app/events/${id}`),

	getCallerId: deviceId =>
		http.get(`/devices/${deviceId}/callerid`),

	setCallerId: (deviceId, callerId) =>
		http.put(`/devices/${deviceId}/callerid`, { value: callerId }),

	getTariffAnnouncement: deviceId =>
		http.get(`/devices/${deviceId}/tariffannouncement`),

	setTariffAnnouncement: (deviceId, enabled) =>
		http.put(`/devices/${deviceId}/tariffannouncement`, { enabled }),

	getNumbers: () =>
		http.get('/numbers'),

	setNumberRouting: (numberId, endpointId) =>
		http.put(`/numbers/${numberId}`, { endpointId }),

	getPortings: () =>
		http.get('/portings'),

	revokePorting: portingId =>
		http.del(`/portings/${portingId}`),

	getWelcome: () =>
		http.get('/app/welcome'),

	setWelcome: enabled =>
		http.put('/app/welcome', { enabled }),

	initiateClickToDial: (phonelineId, caller, callee) =>
		http.post('/sessions/calls', { phonelineId, caller, callee }),

	getBlockAnonymous: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/blockanonymous`),

	setBlockAnonymous: (userId, phonelineId, enabled, target) =>
		http.put(`/${userId}/phonelines/${phonelineId}/blockanonymous`, { enabled, target }),

	getContacts: () =>
		http.get('/contacts'),

	deleteContact: contactId =>
		http.del(`/contacts/${contactId}`),

	deleteAllContacts: () =>
		http.del('/contacts'),

	importContactsFromCSV: base64Content =>
		http.post('/contacts/import/csv', { base64Content }),

	importContactsFromGoogle: token =>
		http.post('/contacts/import/google', { token }),

	fetchSms: userId =>
		http.get(`/${userId}/sms`),

	setSmsAlias: (userId, smsId, alias) =>
		http.put(`/${userId}/sms/${smsId}`, { alias }),

	fetchSmsCallerIds: (userId, smsId) =>
		http.get(`/${userId}/sms/${smsId}/callerids`),

	createSmsCallerId: (userId, smsId, phonenumber) =>
		http.post(`/${userId}/sms/${smsId}/callerids`, { phonenumber }),

	verifySmsCallerId: (userId, smsId, callerId, verificationCode) =>
		http.post(`/${userId}/sms/${smsId}/callerids/${callerId}/verification`, { verificationCode }),

	setActiveSmsCallerId: (userId, smsId, callerId, defaultNumber) =>
		http.put(`/${userId}/sms/${smsId}/callerids/${callerId}`, { defaultNumber }),

	sendFax: (faxlineId, recipient, filename, base64Content) =>
		http.post('/sessions/fax', { faxlineId, recipient, filename, base64Content }),

	resendFax: (faxlineId, faxId) =>
		http.post('/sessions/fax/resend', { faxlineId, faxId }),

	sendSms: (smsId, recipient, message) =>
		http.post('/sessions/sms', { smsId, recipient, message }),

	getBalance: () =>
		http.get('/balance'),

	getNotifications: userId =>
		http.get(`/${userId}/notifications`),

	deleteNotification: (userId, notificationId) =>
		http.del(`/${userId}/notifications/${notificationId}`),

	createVoicemailEmailNotification: (userId, voicemailId, email) =>
		http.post(`/${userId}/notifications/voicemail/email`, { voicemailId, email }),

	createVoicemailSmsNotification: (userId, voicemailId, number) =>
		http.post(`/${userId}/notifications/voicemail/sms`, { voicemailId, number }),

	createFaxEmailNotification: (userId, faxlineId, email, direction) =>
		http.post(`/${userId}/notifications/fax/email`, { faxlineId, email, direction }),

	createFaxSmsNotification: (userId, faxlineId, number, direction) =>
		http.post(`/${userId}/notifications/fax/sms`, { faxlineId, number, direction }),

	createCallEmailNotification: (userId, endpointId, email, direction, cause) =>
		http.post(`/${userId}/notifications/call/email`, { endpointId, email, direction, cause }),

	createCallSmsNotification: (userId, endpointId, number, direction, cause) =>
		http.post(`/${userId}/notifications/call/sms`, { endpointId, number, direction, cause }),

	createFaxReportNotification: (userId, faxlineId, email) =>
		http.post(`/${userId}/notifications/fax/report`, { faxlineId, email }),

	fetchRestrictions: () =>
		http.get('/restrictions'),

	getSipgateIo: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/sipgateio`),

	setSipgateIo: (userId, phonelineId, sipgateIo) =>
		http.put(`/${userId}/phonelines/${phonelineId}/sipgateio`, sipgateIo),

	getSipgateIoLog: (userId, phonelineId) =>
		http.get(`/${userId}/phonelines/${phonelineId}/sipgateio/log`),

	getUserInfo: () =>
		http.get('/authorization/userinfo'),
});
