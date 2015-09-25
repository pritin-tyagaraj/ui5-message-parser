(function() {
	"use strict";
	sap.ui.define("core/CustomModel", [
		"core/CustomMessageParser", "sap/ui/model/json/JSONModel"
	], function(CustomMessageParser, JSONModel) {
		return JSONModel.extend("core.CustomModel", {

			/**
			 * Constructor for the CustomModel. Extend the JSON moded and set this instance of the CustomModel as the message processor for our custom
			 * MessageParser.
			 * 
			 * @constructor
			 */
			constructor: function() {
				JSONModel.prototype.constructor.apply(this, arguments);

				// Instantiate CustomMessageParser
				this._oMessageParser = new CustomMessageParser();
				this._oMessageParser.setProcessor(this);

				// Initialize
				this.setData({});
			},

			/**
			 * Reads data from a service (e.g XSJS service) which is expected to return a JSON object as a response. The method passes the response to
			 * the MessageParser, which updates the MessageManager instance's Message Model. The data in the serice's response is placed within the
			 * model at the path specified by the <code>mParameters.target</code> parameter.
			 * 
			 * @param {Object} mParameters Object containing options
			 * @param {String} mParameters.target (required) The path within the model in which the server's response must be stored
			 * @param {Function} mParameters.success Callback function for success
			 * @param {Function} mParameters.error Callback function for error
			 * @memberOf core.CustomModel
			 */
			read: function(sPath, mParameters) {
				var sTargetPath = mParameters.target;
				var oTargetContext = mParameters.context;
				var fnSuccess = mParameters.success;
				var fnError = mParameters.error;

				// Trigger the READ
				var oModel = this;
				$.ajax({
					url: sPath,
				}).done(function(oResponse) {
					// Pass the response to the MessageParser, and then update the model's data
					oModel._oMessageParser.parse(oResponse);
					oModel.setProperty(sTargetPath, oResponse.data, oTargetContext);

					// If the caller provided a success callback, then call it.
					if (fnSuccess) {
						fnSuccess(oResponse.data);
					}
				}).fail(function() {
					// If the caller provided an error callback, then call it.
					if (fnError) {
						fnError();
					}
				});
			}
		});
	});
})();
