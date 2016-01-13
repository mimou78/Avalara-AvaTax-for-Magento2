define(
    [
        'jquery',
        'Magento_Checkout/js/model/new-customer-address',
        'Magento_Customer/js/customer-data',
        'mage/utils/objects',
        'ClassyLlama_AvaTax/js/lib/serialize-form'
    ],
    function(
        $,
        address,
        customerData,
        mageUtils
    ) {
        'use strict';
        var countryData = customerData.get('directory-data');

        return {
            /**
             * Convert address form data to Address object
             * @param {Object} form
             * @returns {Object}
             */
            formAddressDataToCustomerAddress: function(form) {
                var formData = $(form).serializeObject();

                // clone address form data to new object
                var addressData = $.extend(true, {}, formData),
                    region,
                    regionName = addressData.region;
                if (mageUtils.isObject(addressData.street)) {
                    addressData.street = this.objectToArray(addressData.street);
                }

                addressData.region = {
                    region_id: addressData.region_id,
                    region: regionName
                };

                if (addressData.region_id
                    && countryData()[addressData.country_id]
                    && countryData()[addressData.country_id]['regions']
                ) {
                    region = countryData()[addressData.country_id]['regions'][addressData.region_id];
                    if (region) {
                        addressData.region.region_id = addressData['region_id'];
                        addressData.region.region = region['name'];
                    }
                }

                return address(addressData);
            }
        };
    }
);
