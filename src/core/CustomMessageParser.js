(function() {
	"use strict";
	sap.ui.define("core/CustomMessageParser", [
		"sap/ui/core/message/MessageParser", "sap/ui/core/message/Message"
	], function(MessageParser, Message) {
		return MessageParser.extend("core.CustomMessageParser", {
			/**
			 * This method needs to be implemented when implementing the <code>sap.ui.core.message.MessageParser</code> interface. The message
			 * processor (model) passes every response from the server to this message. This message is responsible for looking at the response,
			 * deciding if there are any messages in the response, and creating the appropriate instances of <code>sap.ui.core.message.Message</code>
			 * and then firing the 'messageChange' event on the model.
			 * 
			 * @memberOf core.CustomMessageParser
			 */
			parse: function(oResponse) {
				// Supported message types
				var mMessageTypes = {
					INFO: sap.ui.core.MessageType.Information,
					WARNING: sap.ui.core.MessageType.Warning,
					ERROR: sap.ui.core.MessageType.Error
				};

				// Form sap.ui.core.message.Message objects from response
				var aNewMessages = [];
				var oMessageProcessor = this.getProcessor();
				$.each(oResponse.messages, function(i, oMessage) {
					var oMessage = new Message({
						message: oMessage.Text,
						description: oMessage.LongText,
						type: mMessageTypes[oMessage.Type],
						processor: oMessageProcessor
					});

					aNewMessages.push(oMessage);
				});

				// Fire the 'messageChange' event on the processor.
				this.getProcessor().fireMessageChange({
					oldMessages: this.aLastMessages,
					newMessages: aNewMessages
				});

				// Update aLastMessages
				this.aLastMessages = aNewMessages;
			},

			/**
			 * This method needs to be implemented when implementing the <code>sap.ui.core.message.MessageParser</code> interface. It stores the
			 * passed parameter (the processor, ie. model, that is this MessageParser will be used with) as an instance member. The processor is a
			 * required property of every <code>sap.ui.core.message.Message</code> that is created by the MessageParser.
			 * 
			 * @memberOf core.CustomMessageParser
			 */
			setProcessor: function(oProcessor) {
				this._oProcessor = oProcessor;
			},

			/**
			 * Getter method for the processor set via <code>setProcessor</code>
			 * 
			 * @memberOf core.CustomMessageParser
			 */
			getProcessor: function() {
				return this._oProcessor;
			}
		});
	});
})();
