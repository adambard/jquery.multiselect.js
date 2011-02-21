(function($){
    $.fn.multiselect = function(){
        var source_select = this;

        selected_vals = this.val() || [];
        console.log(selected_vals)

        var not_selected = $('"<select multiple="multiple" class="options-not-selected"></select>');
        var selected = $('"<select multiple="multiple" class="options-selected"></select>');

        // Copy the name so that the selected bit substitutes for our source.
        selected.attr('name', source_select.attr('name'));

        // Create functions to fire on select and deselect
        // These functions clone the option, rebind dblclick,
        // and append the clone to the opposite list. Then, they
        // destroy their caller.
        var deselect_el = function(){
            var copy = $(this).clone();
            copy.attr('selected','');
            copy.unbind('dblclick').bind('dblclick', select_el);
            $(this).closest(".jquery-multiselect").find(".options-not-selected").append(copy);
            $(this).remove()
        }

        var select_el = function(){
            var copy = $(this).clone();
            copy.attr('selected','selected');
            copy.unbind('dblclick').bind('dblclick', deselect_el);
            $(this).closest(".jquery-multiselect").find(".options-selected").append(copy);
            $(this).remove()
        };

        // Initialize each option's position, and distribute dblclick callbacks.
        $("option", this).each(function(){
            var el = $(this)


            if( $.inArray(el.val(), selected_vals) > -1 ){
                el.dblclick(deselect_el);
                selected.append(el);
            }else{
                el.dblclick(select_el);
                not_selected.append(el);
            }
        });

        // Create the element that will replace the multiselect
        var el = $('<div class="jquery-multiselect"></div>');

        el.append(not_selected);
        el.append(selected);
        source_select.after(el)
        source_select.remove()


        // Always keep elements in the selected area selected
        el.closest('form').submit(function(){
            $("option", selected).attr('selected','selected');
        })
    };
})(jQuery);

