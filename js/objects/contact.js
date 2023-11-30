const contact = () => {
    $('.shogun-form-box-submit').on('click', function() {
        const fname = $(".contact-name input")
        const email = $(".contact-email input")
        const phone = $(".contact-number input")
        const message = $(".message textarea")
        const textValid = '#231f20';
        const textInvalid = '#C9454E';

        $(".validation").remove()
        $('.contact-name .shogun-form-label').css('color', textValid)
        $('.contact-email .shogun-form-label').css('color', textValid)
        $('.contact-number .shogun-form-label').css('color', textValid)
        $('.message .shogun-form-label').css('color', textValid)
        
        let isValid = true
        //first name
        if (!fname.val().length) {
          if (fname.parent().next(".validation").length === 0) {
            isValid = false
            $('.contact-name .shogun-form-label').css('color', textInvalid)
          }
        } 
        //email
        if (!email.val().length) {
          if (email.parent().next(".validation").length === 0) {
            isValid = false
            $('.contact-email .shogun-form-label').css('color', textInvalid)
          }
        } 
        //phone
        if (!phone.val().length) {
            if (phone.parent().next(".validation").length === 0) {
              isValid = false
              $('.contact-number .shogun-form-label').css('color', textInvalid)
            }
          }
        //message
        if (!message.val().length) {
            if (message.parent().next(".validation").length === 0) {
                isValid = false
                $('.message .shogun-form-label').css('color', textInvalid)
              }
        } 
        return isValid
      }) 

    $('.shogun-form-text-input input, .shogun-form-text-input textarea').on('focus blur', function (e) {
        $(this).parents('.shogun-form-text-input').toggleClass('is-focused', (e.type === 'focus' || this.value.length > 0));
      }).trigger('blur');

      function updateSelectElement() {
        $('select').each(function () {
            let options = [];
            // get the values from Select Elements
            $(this).find('option').each(function () {
                const text = $(this).text();
                const value = $(this).attr('value') != undefined ? $(this).attr('value') : '';

                let option = {};
                option.text = (text);
                option.value = (value);

                options.push(option);
            });

            let dropdownHTML = builtDropdown(options);
            $(this).addClass('custom-select')
                .before(dropdownHTML);
        });
        initCustomDropdown();
    }
    // create new container for custom dropdown
    function builtDropdown(options) {
        let dropdownHTML = '<div class="custom-dropdown">';
        options.forEach(function (item, index) {
            if (index === 0) {
                dropdownHTML += '<a href="javascript:void(0)">' + item.text + '</a>';
            } else {
                if (index === 1) {
                    dropdownHTML += '<ul class="sort-dropdown-content">';
                }
                dropdownHTML += '<li data-value="' + item.value + '">' + item.text + '</li>';
            }
        });
        dropdownHTML += '</ul></div>';
        return dropdownHTML;
    }

    function initCustomDropdown() {
        const customDropdown = '.custom-dropdown';
        $(customDropdown).each(function () {
            $(this).find('a').on('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const $this = $(this);
                $('.custom-dropdown.active').not($this.parent()).removeClass('active');
                $this.parent().toggleClass('active');
            });

            $(this).find('ul').on('click', 'li', function (e) {
                e.preventDefault();
                const selectedText = $(this).text();
                const selectedValue = $(this).attr('data-value');
                const selectElem = $(this).closest('.shogun-form-dropdown').find('select');

                $(this).closest('.shogun-form-dropdown')
                    .find('a')
                    .addClass('hasValue')
                    .text(selectedText);

                if (selectedValue) {
                    $(selectElem).val(selectedValue).trigger('change');
                }
                $('.custom-dropdown.active').removeClass('active');
            });
        });

        // Hide dropdown menu on click outside
        $(document).on("click", function (event) {
            const $trigger = $(customDropdown);
            if ($trigger !== event.target && !$trigger.has(event.target).length) {
                $trigger.removeClass('active');
            }
        });
    }

    updateSelectElement();
}

export default contact;