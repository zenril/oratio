##Welcome to the oratio wiki!##
You can define scales or ratios for elements so they maintain their height based on width.
You can define scale or ratios for multiple screen sizes or page widths, so as the page size decreases the ratios will change. You can also define custom screen or page sizes.

This library only generates css and attaches it to the page.
Once this is done you could find the styles and attach them manually to the page.

##Start here##

Place the JS File at the bottom of you page
    <script src="js/oratio.js"></script>

Define the elements scales or ratios to an element using the custom attribute `data-auto-scaler`, which is customizable. Then Append a `<content>` container to the element which holds your desired content.

    <div data-auto-scaler='scale-xs-10 scale-sm-20 scale-md-100 ratio-lg-16-9'>
        <content>
            <!-- your content goes here -->
        </content>
    </div>

Use prefixes to define a scale or ratio

Prefix Type                      |scale-xs-,<br> ratio-xs-|scale-sm-,<br> ratio-sm-|scale-md-,<br> ratio-md- |scale-lg-,<br> ratio-lg-
---------------------------------|---------|---------|----------|------------------------
Screen sizes | < 768px | > 768px | > 992px  | > 1200px
                                 | Phones  | Tablets | Desktops | Large devices Desktops 


Use a percentage suffix and the prefix `scale-*-` this will make the elements height a percentage of the width.
This will Scale the height of the element on small devices/screens to be 10% of the Elements width
      
    scale-xs-10
   
Use a ratio suffix (16-9 aka 16:9) and the prefix `ratio-*-` to define the elements size by ratio.
This will keep the elements width and height to a ratio of 16:9
    
    ratio-xs-16-9



