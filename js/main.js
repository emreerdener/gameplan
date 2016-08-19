$(document).ready(function() {
 
    var groups = [];
    var reps = [];
    var queues = [];
    var queueNames = [];
    var nonCore = [];

    
//---------Navbar----------
    $('#settings-link').hide();
    //Adds spin animation to Settings "gear" in navbar 
    $('.nav-cog, #settings-link').hover(function() {
        $('.nav-cog').toggleClass('fa-spin');
    });
    
    //Adds bounce animation to ninja logo
    $('#groups-img').click(function() {
        $(this).effect('bounce', 'slow');
    });

        
//----------Navitagion----------    
    //Initial homepage display (show/hide)
    $('.breadcrumbs').hide();
    $('#reps-working-view').hide();
    $('#queue-import-view').hide();
    $('#settings').hide();
    $('#desktop-cog, #settings-link').hide();
    $('#groupHome-view').hide();
    $('#group-nav-title').hide();
    $('#mobile-cog').hide();
    $('.navbar').hide();
        
    //Groups view
    $('.navbar-brand').on('click', function() {
        $('#groups-view').show();
        $('#group-nav-title').hide();
        $('#groupHome-view').hide();
        $('#settings').hide();
        $('#reps-working-view').hide();
        $('#queue-import-view').hide();
        $('.breadcrumbs').hide();
        $('#desktop-cog, #settings-link').hide();
        $('#mobile-cog').hide();
        $('.navbar').hide();
        $('.group-data').hide();
    });
    
    //To Home-Group view (from groups select)
    $('#groups-view').on('click', '.gc-title', function() {
        $('#desktop-cog, #settings-link').show();
        $('#groupHome-view').show();
        $('#group-nav-title').show();
        $('#mobile-cog').show();
        $('#groups-view').hide();
        $('#reps-working-view').hide();
        $('#queue-import-view').hide();
        $('.breadcrumbs').hide();
        $('.navbar').show();
    });
    
    //Home-Group view (from navbar)
    $('.navbar').on('click', '#group-nav-title', function() {
        $('#desktop-cog, #settings-link').show();
        $('#groupHome-view').show();
        $('#group-nav-title').show();
        $('#groups-view').hide();
        $('#reps-working-view').hide();
        $('#queue-import-view').hide();
        $('.breadcrumbs').hide();
        $('#settings').hide();
        $('.navbar').show();
    });
    
    //Back in groups-home view
    $('#group-home-back').on('click', function() {
        $('#groups-view').show();
        $('#group-nav-title').hide();
        $('#groupHome-view').hide();
        $('#settings').hide();
        $('#reps-working-view').hide();
        $('#queue-import-view').hide();
        $('.breadcrumbs').hide();
        $('#desktop-cog, #settings-link, #mobile-cog').hide();
        $('.navbar').hide();
        $('.group-data').hide();
    });
    
    //Create
    $('.create-btn').on('click', function() {
        $('#reps-working-view').show();
        $('.breadcrumbs').show();
        $('#groupHome-view').hide();
        $('.bread-reps').removeClass('bread-completed');
        $('.bread-reps').addClass('bread-active');
        $('.bread-vol').removeClass('bread-active');
        $('.navbar').show();
    });
    
    //Reps-working view
    $('#queue-import-back, .bread-reps').on('click', function() {
        $('#reps-working-view').show();
        $('.breadcrumbs').show();
        $('#queue-import-view').hide();
        $('.bread-reps').removeClass('bread-completed');
        $('.bread-reps').addClass('bread-active');
        $('.bread-vol').removeClass('bread-active');
        $('.navbar').show();
    });
    
    //Queue import view
    $('#reps-working-next, .bread-vol').on('click', function() {
        $('#queue-import-view').show();
        $('.breadcrumbs').show();
        $('#reps-working-view').hide();
        $('.bread-reps').removeClass('bread-active');
        $('.bread-reps').addClass('bread-completed');
        $('.bread-vol').addClass('bread-active');
        $('.navbar').show();
    });
  
    //Settings view
    $('#desktop-cog, #mobile-cog, #settings-link').on('click', function() {
        $('#settings').show();
        $('#groups-view').hide();
        $('#groupHome-view').hide();
        $('.breadcrumbs').hide();
        $('#reps-working-view').hide();
        $('#queue-import-view').hide();
        $('.navbar').show();
    });  
    
    //Settings back
    $('#settings-back').on('click', function() {
        $('#reps-working-view').show();
        $('#group-nav-title').show();
        $('.breadcrumbs').show();
        $('#desktop-cog, #settings-link').show();
        $('#groups-view').hide();
        $('#groupHome-view').hide();
        $('#settings').hide();
        $('#queue-import-view').hide();
        $('.navbar').show();
    });



//---------Settings---------  
    //Settings Save button
    $('#settings-save').on('click', function() {
        $('.settings-datestamp').empty();
        $('.settings-heading').before('<span class="settings-datestamp text-center">Saved: ' + moment().format("l, h:mma") + '</span>');
    });
    
    
  
//------------------------------------------------------------------    
    
//--------Rep Working button & Rep Profile
    $('#add-rep-form').submit(function(event) {
             
        //Name for Rep from input value. Then assigned to variable
        var repName = $('#addrep-name').val();
        
        //Rep Button stored in local variable (to be added)
        var repButton = '<button type="button" id="' + repName + '" class="btn-rep btn btn-lg btn-default">' + repName + '</button>';  
        
        //Rep Profile stored in variable (to be added)
        var repProfile = `\
            <div class="container rep-card">\
                <div class="jtextfill">\  
                    <h3 class="repProfileName"><span>` + repName + `</span></h3>\
                </div><!--jtextfill-->\
                <div class="rep-card-queues"></div>\
                <button type="button" class="delete-rep btn btn-danger">DELETE</button>\
            </div>`;
        
        //Non-core work card (to be added)
        var ncInputCard = `\
            <div class="nc-input-card" data-nc="` + repName + `">\
                <div class="nc-input-name">\
                    ` + repName + `\
                </div><!--nc-input-name-->\
                <input class="nc-input" type="number" placeholder="Hours">\
            </div><!--nc-input-card-->`;
        
        //Checks if repName is already in rep array. if so, it's rejected. If not, it's added to reps array.
        if (reps.indexOf(repName) !== -1) {
            $('.rep-settings-container').before('<span class="repname-duperror text-center">Duplicate name. Please enter a different name.</span>');
            //Fade out error message
            $('.repname-duperror').delay(1200).fadeOut();
        } else if (repName === "") {
            $('.rep-settings-container').before('<span class="repname-emptyerror text-center">Please input a name.</span>');
            //Fade out error message
            $('.repname-emptyerror').delay(1200).fadeOut();
        } else {
            //Adds repName to reps array
            reps.push(repName);
            nonCore.push(ncInputCard);
            
            //Rep Profile added in rep-profile container
            $('.rep-profiles').append(repProfile);
            
            //Rep Button added in rep-buttons container
            $('.rep-buttons').append(repButton);
            
            //Adds nonCore cards to Non-Core Work section
            $('.non-core-data').append(ncInputCard);
            
            //Adds queues array to local variable of repName
            $('.rep-card:contains(' + repName + ') .rep-card-queues').append(queues);    
        }//--close if statement
        
        //Hide non-core-input cards (to show/hide--around line 290)
        $('.nc-input-card').hide();
        
        //Clears rep input field
        $('#addrep-name').val(''); 
        
        //Plugin to resize text (repName) to container width
        $('.jtextfill').textfill({ maxFontPixels: 24 });
            
        //Remove white spaces from ID repName and make all lower-case
        $('[id="' + repName + '"]').attr('id', repName.replace(/ /g, '').toLowerCase());
        //Remove white space for nc-input-card data-nc and make lower-case
        $('[data-nc="' + repName + '"]').attr('data-nc', repName.replace(/ /g, '').toLowerCase());
        
        //Prevents default form submit, causing page reload
        event.preventDefault(); 
    });//--close add rep
 
     
   
    
//-----Queue button to Rep Profile-----
    $('#add-queue-form').submit(function(event) {
        
        //Name for Queue from input value
        var queueName = $('#addQueue-name').val();
        
        //Queue button stored in variable (to be added)
        var repQueues = '<button class="btn btn-lg btn-block btn-default repQueues-btn">' + queueName + '</button>';
        
        //Queue Profile stored in variable (to be added)
        var queueProfile = `\
        <div class="queue-card">\
            <div class="queue-bar">\    
                <span>\
                    <i class="refuseAccordion fa fa-bars fa-2x" aria-hidden="true"></i>\
                    <h4 class="queueProfileName">` + queueName + `</h4>\
                </span>\
            </div><!--queue-bar-->\
            <div class="queue-data">\
                <div class="graph-preview">\
                    <img src="images/graph-ex.png"/>\
                </div>\
                <div class="queue-data-fields">\
                    
<table class="queue-table table">\
<tbody>\
<tr>\
<td class="title-right">\
                        <h4 class="data-title">Queue Name</h4>\
</td>\
<td class="input-left">\
                        <input id="queue-data-name" class="queue-data-input" type="text" placeholder="Name">\
</td>\
</tr>\

<tr>\
<td class="title-right grey">\
                        <h4 class="data-title">Utilization Time</h4>\
</td>\
<td class="input-left grey">\
                        <input class="queue-data-input" type="text" placeholder="Seconds">\
</td>\
</tr>\

<tr>\
<td class="title-right">\
                        <h4 class="data-title">Daily Growth</h4>\
</td>\
<td class="input-left">\
                        <input class="queue-data-input" type="text" placeholder="Percentage">\
</td>\
</tr>\

<tr>\
<td class="title-right grey">\
                        <h4 class="data-title">Database ID</h4>\
</td>\
<td class="input-left grey">\
                        <input class="queue-data-input" type="text" placeholder="SQL">\
</td>\
</tr>\

<tr>\
<td class="title-right">\
                        <h4 class="data-title">Minimum Volume</h4>\
</td>\
<td class="input-left">\
                        <input class="queue-data-input" type="text" placeholder="Min Number">\
</td>\
</tr>\

<tr>\
<td class="title-right grey">\
                        <h4 class="data-title">Maximum Volume</h4>\
</td>\
<td class="input-left grey">\
                        <input class="queue-data-input" type="text" placeholder="Max Number">\
</td>\
</tr>\

<tr>\
<td class="title-right">\
                        <h4 class="data-title">Maximum Assign</h4>\
</td>\
<td class="input-left">\
                        <input class="queue-data-input" type="text" placeholder="Max Number">\
</td>\

</tr>\
</tbody>\
</table>\

                    <button type="button" class="btn btn-danger delete-queue">DELETE</button><!--delete-queue-->\
                </div><!--queue-data-fields-->\
            </div><!--queue-data-->\
        </div><!--queue-card-->`;
        
        //Queue import field (to be added)
        var queueVolume = `\
        <div class="container queue-volume-card">\
            <div class="queue-volume-name">\
                    <h4>` + queueName + `</h4>\
            </div><!--queue-volume-name-->\
            <div class="queue-volume-data">\
                <div type="button" class="qvolume-graph">\
                    <i class="fa fa-bar-chart fa-lg" aria-hidden="true"></i>\
                </div><!--qvolume-graph-->\
                <div class="queue-volume-input">\
                    <input class="qv-input" type="number" placeholder="Volume" pattern="[0-9]*" inputmode="numeric">\
                </div><!--queue-volume-input-->\
                <div role="button" class="qv-alert text-center" data-toggle="popover" data-placement="top">\
        <div class="popover_content_wrapper hide">` + queueName + ` is 23% above average</div>\
                    <span class="fa-stack">\
                        <i class="fa fa-bell fa-stack-2x" aria-hidden="true"></i>\
                        <i class="fa fa-circle fa-stack-1x" aria-hidden="true"></i>\
                    </span>\
                </div><!--qv-alert-->\
            </div><!--queue-volume-data-->\
        </div><!--queue-volume-card-->`;        
        
        //Checks if queueName is already in queueNames array. if so, it's rejected. If not, it's added to queues array.
        if (queueNames.indexOf(queueName) !== -1) {
            $('.queue-settings-container').before('<span class="queuename-duperror text-center">Duplicate queue. Please enter a different queue.</span>');
            //Fade out error message
            $('.queuename-duperror').delay(1200).fadeOut();
        } else if (queueName === "") {
            $('.queue-settings-container').before('<span class="queuename-emptyerror text-center">Please input a queue name.</span>');
            //Fade out error message
           $('.queuename-emptyerror').delay(1200).fadeOut();
        } else {     
            //Adds Queue button to array
            queues.push(repQueues);
            queueNames.push(queueName);

            //Queue Profile added in rep-profile container
            $('.queue-profiles').append(queueProfile);

            //Adds queues to Rep Profile card
            $('.rep-card-queues').append(repQueues);
            
            //Adds queues to Queue Volume cards
            $('.queue-imports').append(queueVolume);
        }//--close if statement
        
    //Clears queue input field
    $('#addQueue-name').val('');     
          
    //Hides queue-data to be toggled in drop-down
    $('.queue-data').hide();   
    
    //Hides notification circle (to be shown)
    $('.fa-circle').hide();    
        
    //Prevents default form submit, causing page reload
    event.preventDefault();
});//--close add queue
   
  
//------------------------------------------------------------------
    
    
    
//-----Group Button submit-----    
$('#add-group-form').submit(function(event) {
    //Name for group from input value
    var groupName = $('#addGroup-name').val();
        
    //Group button stored in variable (to be added)
    var groupButton = '<div class="group-card">\
                    <div class="gc-title btn">\
                        <span>\
                            <i class="refuseAccordion fa fa-bars fa-2x" aria-hidden="true"></i>\
                            <h3>' + groupName + '</h3>\
                        </span>\
                    </div><!--gc-title-->\
                    <div class="group-options btn">\
                        <h5 class="hidden-xs">OPTIONS</h5>\
                        <i class="visible-xs fa fa-chevron-right chevron-toggle" aria-hidden="true"></i>\
                    </div><!--group-options-->\
                    <div class="group-data">\
                        <h4>Group Name</h4>\
                        <input id="groupName-edit" type="text" placeholder="Enter Name"/>\
                        <button type="button" class="btn btn-danger group-delete">DELETE</button><!--group-delete-->\
                    </div><!--group-data-->\
            </div><!--group-card-->';
    
    //Checks if groupName is already in groups array. if so, it's rejected. If not, it's added to groups array.
        if (groups.indexOf(groupName) !== -1) {
            $('.groups-container').before('<span class="groupname-duperror text-center">Duplicate group. Please enter a different group name.</span>');
            //Fade out error message
            $('.groupname-duperror').delay(1200).fadeOut();
        } else if (groupName === "") {
            $('.groups-container').before('<span class="groupname-emptyerror text-center">Please input a group name.</span>');
            //Fade out error message
           $('.groupname-emptyerror').delay(1200).fadeOut();
        } else {     
            //Adds group button to array
            groups.push(groupName);

            //Group Profile added in group-profiles container
            $('.group-profiles').append(groupButton);   
            
            //Home-Group title added to groupHome-view
            $('#group-nav-title').append(groupName);
        }//--close if statement
        
    //Clears group input field
    $('#addGroup-name').val('');
    
    //Hides group-data to be toggled in drop-down
    $('.group-data').hide(); 
    
    //Prevents default form submit, causing page reload
    event.preventDefault();
});//--close add type
    
    
    
     
//--------Groups Cards--------
    //Allows queue-cards to be sortable
    $('.group-profiles').sortable();  
    
    //Toggle group data in group cards
    $('.group-profiles').on('click', '.group-options', function(e) {
        //Toggle
        $(this).parent('.group-card').find('.group-data').slideToggle(100, function() {
        
            //Styles added/removed if button toggled or not    
            if ( $(this).is(':hidden') ) { 
                //Adds styles for button toggle
                $(this).parent('.group-card').find('.group-options').removeClass('goptions-toggle');
                //Adds styles for button toggle
                $(this).parent('.group-card').find('.gc-title').removeClass('gc-title-toggle');

                //Toggle chevron right to down on click
                $(this).parent('.group-card').find('.chevron-toggle').addClass('fa-chevron-right');
                $(this).parent('.group-card').find('.chevron-toggle').removeClass('fa-chevron-down');

            } else {
                //Adds styles for button toggle
                $(this).parent('.group-card').find('.group-options').addClass('goptions-toggle');
                //Adds styles for button toggle
                $(this).parent('.group-card').find('.gc-title').addClass('gc-title-toggle');

                //Toggle chevron right to down on click
                $(this).parent('.group-card').find('.chevron-toggle').removeClass('fa-chevron-right');
                $(this).parent('.group-card').find('.chevron-toggle').addClass('fa-chevron-down');
            }//--close if
        });  
        e.preventDefault();
    });
    //Prevents slideToggle when interacting with group-data
    $('.group-profiles').on('click', '.group-data', function() {
        return false;    
    });    
    $('.group-profiles').on('click', '.fa-bars', function() {
        return false;
    });
  
    
//--------Import Queues--------
    $('.importQueuesBtn').on('click', function() {
        //Removes previous time-stamp
        $('.import-datestamp').empty();
        //Adds time stamp when button clicked
        $('.volumes-header').before('<span class="import-datestamp text-center">Last Imported: ' + moment().format("l, h:mma") + '</span>');
        
//!!!!!!!!!!!!!Toggle button color to indicate import successful
        $(this).toggleClass('importQueuesBtnClr importQueuesDone');
    });
    
    
    
//--------Popover--------  
    //Initialize popovers for entire page
    $(function () {
        $('[data-toggle="popover"]').popover()
    })
    
    //Initialize popover
    $('.queue-imports').on('mouseover', '.qv-alert', function() {
        $(this).popover({
            html : true,
            content: function() {
                return $(this).find('.popover_content_wrapper').html();
            }
        });
    });    

    //Close popover on off click    
    $('body').on('click', function(e) {    
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
    //Stop double-click to fire popover
    $('body').on('hidden.bs.popover', function(e) {
        $(e.target).data('bs.popover').inState.click = false;
    });

    //Toggles visibility of notification circle for queue volumes
    $('.queue-imports').on('change', '.qv-input', function() {  
        if ($(this).val() > 10) {
            $(this).parent('.queue-volume-input').siblings('.qv-alert').find('.fa-circle').show('fast');
        } else {
            $(this).parent('.queue-volume-input').siblings('.qv-alert').find('.fa-circle').hide('fast');
        }
    });    


 
//--------Queue Cards--------
    //Allows queue-cards to be sortable
    $('.queue-profiles').sortable();    
    
    //Toggle queue data in queue cards
    $('.queue-profiles').on('click', '.queue-bar', function(e) {
        $(this).parent('.queue-card').find('.queue-data').slideToggle('fast');      
        e.preventDefault();
    });
    //Prevents slideToggle when interacting with 3 bars icon
    $('.queue-profiles').on('click', '.fa-bars', function() {
        return false; 
    });
    
           
    

//--------Non-Core Work--------
    //Hide elements to be toggled on click
    $('.non-core-data').hide();
    
    //Toggle non-core work data
    $('.non-core-card').on('click', function(e) {
        $(this).find('.non-core-data').slideToggle('fast');
        //Toggle button styles on click
        $('.non-core-name').toggleClass('non-core-btn-styles');
        //Toggle chevron right to down on click
        $('.chevron-toggle').toggleClass('fa-chevron-right fa-chevron-down');       
        e.preventDefault();
    });
    
    //Prevents slideToggle when clicking on non-core-data
    $('.non-core-card').on('click', '.non-core-data', function() {
        return false;
    });
    
    //Changes non-core card to green if input is above 0 or not empty  
    $('.non-core-data').on('change', '.nc-input-card', function() {
        //Changes non-core card back to white if 0 or empty
        if ( ( $(this).find('.nc-input').val() ) == (0 && '') ) {
            $(this).css({'background-color' : 'white'});
            $(this).find('.nc-input-name').css({'color' : 'black'});
        } else {
            $(this).css({'background-color' : '#5cb85c'});
            $(this).find('.nc-input-name').css({'color' : 'white'});
        }
    });
    
    //Show / Hide Non-Core Work cards from rep-buttons
    $('.rep-buttons').on('click', '.btn-rep', function() {
            //Toggles button color for select
            $(this).toggleClass('btn-default btn-success');
             
            var repSelect = $(this);            
            
            //If btn-rep is selected then show corresponding non-core-work button
            if( $(this).hasClass('btn-success') ) {             
                //Match btn-rep ID to nc-input-card data to show
                $('.nc-input-card[data-nc="' + repSelect.attr('id') + '"]').show();
            } else {
                //Match btn-rep ID to nc-input-card data to hide & clear input value
                $('.nc-input-card[data-nc="' + repSelect.attr('id') + '"]').hide().find('.nc-input').val('').trigger('change');    
            }//--close if statement        
        }).trigger('change');
  
   

    
//--------Delete Group--------    
    //Removes group-card on "delete" button click
    $('.group-profiles').on('click', '.group-delete', function() {
        $(this).closest('.group-card').fadeOut(function() {
            $(this).remove();
        });
    });
    
//--------Delete Queue--------    
//Removes queue-card on "delete" button click
$('.queue-profiles').on('click', '.delete-queue', function() {
    $(this).closest('.queue-card').fadeOut(function() {
        $(this).remove();
    });
}); 
    
//--------Delete Rep--------    
    //Removes rep-card on "delete" button click
    $('.rep-profiles').on('click', '.delete-rep', function() {
        $(this).parent('.rep-card').fadeOut(function() {
            $(this).remove();    
        });
    });
    
    
//---------Button toggle---------    
    //Toggle button from grey to green on click
    function toggleButton() {
        $(this).toggleClass('btn-default btn-success'); 
    }   
    //Toggles repQueues buttons
    $('.rep-profiles').on('click', '.repQueues-btn', toggleButton);
    
    
    
//--------Date Stamp--------
$('#date-stamp').append(moment().format('ddd - MMMM D, YYYY'));
        
    
}); //end of .ready document

