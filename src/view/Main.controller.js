(function() {
	"use strict";

	sap.ui.define([
		"core/CustomModel", "sap/ui/core/message/MessageManager"
	], function(CustomModel, MessageManager) {
		sap.ui.controller("view.Main", {

			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created. Can be used to modify the View
			 * before it is displayed, to bind event handlers and do other one-time initialization.
			 * 
			 * @memberOf view.Main
			 */
			onInit: function() {
				// Instantiate model
				var oModel = new CustomModel();
				this.getView().setModel(oModel);

				// Read data
				oModel.read("data/sampleCustomersWithError.json", {
					target: "/Customers"
				});

				// Create message manager
				this._oMessageManager = new MessageManager();
				this._oMessageManager.registerMessageProcessor(oModel);
			},

			/**
			 * Event handler for the 'press' event of the 'Show messages' button. This method instantiates an <code>sap.m.MessagePopover</code> (via
			 * a fragment), binds it to the MessageManager instance's model and opens the popover.
			 * 
			 * @param {sap.ui.base.Event} oEvent The event object
			 * @memberOf view.Main
			 */
			handleMessagesPress: function(oEvent) {
				// Get a reference to the button that raised this event
				var oSource = oEvent.getSource();

				// Create an instance of the MessagePopover control. Store a reference to the created popover so that we create it only once.
				if (!this._oMessagePopover) {
					// Instantiate
					this._oMessagePopover = sap.ui.xmlfragment("fragment.MessagePopover");

					// Set MessageManager's model
					var oMessageModel = this._oMessageManager.getMessageModel();
					this._oMessagePopover.setModel(oMessageModel);
				}

				// Open the MessagePopover
				this._oMessagePopover.openBy(oSource);
			}
		});
	})
})();
