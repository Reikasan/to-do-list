$(function() {
    /*KEYDOWN*/
    $('input').keydown(function(e) {
        var item = $(this).val();
        
       if(e.keyCode == 13 && item !=""){
           
           var days = $(this).parent().siblings().html();
           var numOfList = $(this).parent().parent().siblings().children().length;
           var id = days + item + (numOfList + 1);
           
            $(this).parent().parent().siblings().append('<li class="customCheck"><input type="checkbox" value=' + item + ' id="' + id +'"><label class="checkmark" for="' + id  + '"></label><span class="checked"><i class="fas fa-check"></i></span>' + item + '</li>');
            $(this).val('');
       }
    });
    
    //DRAGGABLE AND SORTABLE
    $('.list').sortable({
        connectWith: "ul.list",
        dropOnEmpty: true
    });
    
    // DROP TO ANOTHER WEEKDAY AND CHANGE ID AND FOR ATTRIBUTE
    $('.ui-sortable').droppable({
        drop: function(){
            var movedItem = $('.ui-sortable-helper').children('input');
            var movedItemLabel = $('.ui-sortable-helper').children('label');
            var movedItemId = movedItem.attr('id');
            
            movedItem.attr('id', movedItemId + 'moved');
            movedItemLabel.attr('for', movedItemId + 'moved');
        }
    });
    
    
    //DELETE AND ADD FINISHED LIST
    var finishedItems = [];
    
    var listArea = $('#listArea');
    
    
    $('.trash').droppable({
        drop: function(event, ui){
            // add select item to the finishedList
            var selectedItem = $('.ui-sortable-helper').children('input');
            var finVal = selectedItem.val();
            finishedItems.push(finVal);
            
            // print finishedList array in list area 
            if(finishedItems.length <= 10) {   
                $('#listArea ul').append('<li class="finishedItem">' + finVal + '</li>');
            } else if(finishedItems.length === 11) {
                listArea.append('<ul class="secondLine"><li class="finishedItem">' + finVal + '</li></ul>');
            } else if(finishedItems.length > 11 && finishedItems.length < 21) {
                $('ul.secondLine').append('<li class="finishedItem">' + finVal + '</li>');
            } else if(finishedItems.length === 21) {
                listArea.append('<ul class="thirdLine"><li class="finishedItem">' + finVal + '</li></ul>');
            } else if(finishedItems.length >21 && finishedItems.length < 31) {
                $('.thirdLine').append('<li class="finishedItem">' + finVal + '</li>');
            }
            
            ui.draggable.remove();
            
            //CHANGE THE CLOUD IMAGE
            $('#cloud').attr('src','img/e0180_1.png');
            
            console.log(finishedItems);
        }
    });

    
    
     //CLICK AND JUMP
    var trashedIcon = $('#trashIcon');
    
    $(document).on('change', 'input[type="checkbox"]', function(event, ui) {
        var checkedItem = $(this);
        console.log(checkedItem.val());
        
        checkedItem.addClass('moveToBin');
        var finVal = checkedItem.val();
        finishedItems.push(finVal);
        
        // print finishedList array in list area 
            if(finishedItems.length <= 10) {   
                $('#listArea ul').append('<li class="finishedItem">' + finVal + '</li>');
            } else if(finishedItems.length === 11) {
                listArea.append('<ul class="secondLine"><li class="finishedItem">' + finVal + '</li></ul>');
            } else if(finishedItems.length > 11 && finishedItems.length < 21) {
                $('ul.secondLine').append('<li class="finishedItem">' + finVal + '</li>');
            } else if(finishedItems.length === 21) {
                listArea.append('<ul class="thirdLine"><li class="finishedItem">' + finVal + '</li></ul>');
            } else if(finishedItems.length >21 && finishedItems.length < 31) {
                $('.thirdLine').append('<li class="finishedItem">' + finVal + '</li>');
            }
        
        $(this).parent().addClass('fade');
        
        setTimeout(remove, 500);
        
        function remove() {
            console.log(' remove event');
            $('.fade').addClass('remove');
        }
        
        
        
        //CHANGE THE CLOUD IMAGE
        $('#cloud').attr('src','img/e0180_1.png');
    });
        /*
        
        $(document).on("change", "input[name='member']", function () {
            alert("FECK");
            if (this.checked) {}
        });
        if ($(this).is(':checked')) {
            console.log($(this).val() + ' is now checked');
        } else {
            console.log($(this).val() + ' is now unchecked');
        }
        
            var checkedItem = $('input:checked');
            console.log(checkedItem.val());
            checkedItem.addClass('moveTOBin');

            checkedItem.parent().parent().draggable.remove();

            //CHANGE THE CLOUD IMAGE
            $('#cloud').attr('src','img/e0180_1.png');     */
        
    
    //CHANGE THE TRASH CAN ICON BY HOVER
    
    trashedIcon.mouseenter(function() {
        trashedIcon.removeClass("far fa-trash-alt");
        trashedIcon.addClass("fas fa-trash-alt");
    });
    
    trashedIcon.mouseleave(function() {
        trashedIcon.removeClass("fas fa-trash-alt");
        trashedIcon.addClass("far fa-trash-alt");
        
        // BACK TO NORMAL CLOUD IMAGE
        $('#cloud').attr('src','img/e0180_0.png');
    });
    
    $(document).click(function() {
        trashedIcon.removeClass("fas fa-trash-alt");
        trashedIcon.addClass("far fa-trash-alt");
        
        // BACK TO NORMAL CLOUD IMAGE
        $('#cloud').attr('src','img/e0180_0.png');
    });
    
    
    
    // CLICK THE BUTTON AND SHOW FINISHED LIST
    var finished = $('#finished');
    var headline = $('#finishedHL');
 
    var listBtn = $('#listBtn');
    
    
        
    listBtn.on("click", function() {
        if(headline.hasClass('hide') && listArea.hasClass('hide')) {
            

            
            // remove hide class
            finished.removeClass('hide');
            headline.removeClass('hide');
            listArea.removeClass('hide');

            // manupulate the button text
            listBtn.html('Close the Finished List');
        } else {
            // add hide class
            finished.addClass('hide');
            headline.addClass('hide');
            listArea.addClass('hide');

            console.log(finishedItems);
            
            listBtn.html("See what you've done this week!");
        }
    });
});
