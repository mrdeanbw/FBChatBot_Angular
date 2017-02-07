/* ============================================================
 * Directive: pgFormGroup
 * Apply Pages default form effects
 * ============================================================ */

function pgFormGroup() {
    return {
        restrict: 'A',
        link: (scope, element, attrs) => {

            $(element).on('click', function () {
                $(this).find(':input').focus()
            });

            let $body = $('body');

            $body.on('focus', '.form-group.form-group-default :input', function () {
                    $('.form-group.form-group-default').removeClass('focused');
                    $(this).parents('.form-group').addClass('focused');
                }
            );

            $body.on('blur', '.form-group.form-group-default :input', function () {
                    $(this).parents('.form-group').removeClass('focused');
                    if ($(this).val()) {
                        $(this).closest('.form-group').find('label').addClass('fade');
                    } else {
                        $(this).closest('.form-group').find('label').removeClass('fade');
                    }
                }
            );

            $(element).find('.checkbox, .radio').hover(function () {
                    $(this).parents('.form-group').addClass('focused');
                }, function () {
                    $(this).parents('.form-group').removeClass('focused');
                }
            );
        }
    }
}


export default pgFormGroup;