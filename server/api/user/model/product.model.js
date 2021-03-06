/**
 * Created by lakum on 20/4/16.
 */
var express=require("express");
var mongoose=require("mongoose");
var mongojs = require('mongojs');
var Schema = mongoose.Schema;
var productSchema =  new Schema({
    projectid:String,
    userId:String,
    id:Number,
    keyword_filter:String,
    name:String,
    type:String,
    sku:String,
    description:String,
    search_keywords:String,
    availability_description:String,
    price:String,
    cost_price:String,
    retail_price:String,
    sale_price:String,
    calculated_price:String,
    sort_order:String,
    is_visible:String,
    is_featured:String,
    related_products:String,
    inventory_level:String,
    inventory_warning_level:String,
    warranty:String,
    weight:String,
    width:String,
    height:String,
    depth:String,
    fixed_cost_shipping_price:String,
    is_free_shipping:String,
    inventory_tracking:String,
    rating_total:String,
    rating_count:String,
    total_sold:String,
    date_created:String,
    brand_id:String,
    view_count:String,
    page_title:String,
    meta_keywords:String,
    meta_description:String,
    layout_file:String,
    is_price_hidden:String,
    price_hidden_label:String,
    categories:[Number],
    date_modified:Date,
    event_date_field_name:String,
    event_date_type:String,
    event_date_start:String,
    event_date_end:String,
    myob_asset_account:String,
    myob_income_account:String,
    myob_expense_account:String,
    peachtree_gl_account:String,
    condition:String,
    is_condition_shown:Boolean,
    preorder_release_date:Date,
    is_preorder_only:Boolean,
    preorder_message:String,
    order_quantity_minimum:Number,
    order_quantity_maximum:Number,
    open_graph_type:String,
    open_graph_title:String,
    open_graph_description:String,
    is_open_graph_thumbnail:Boolean,
    upc:String,
    avalara_product_tax_code:String,
    date_last_imported:String,
    option_set_id:Number,
    tax_class_id:Number,
    option_set_display:String,
    bin_picking_number:String,
    custom_url:String,
    primary_image:{
        id:Number,
        zoom_url:String,
        thumbnail_url:String,
        standard_url:String,
        tiny_url:String
    },
    availability:String,
    brand:{
        url:String,
        resource:String
    },
    downloads:{
        url:String,
        resource:String
    },
    images:{
        url:String,
        resource:String
    },
    discount_rules:{
        url:String,
        resource:String
    },
    configurable_fields:{
        url:String,
        resource:String
    },
    custom_fields:{
        url:String,
        resource:String
    },
    videos:{
        url:String,
        resource:String
    },
    skus:{
        url:String,
        resource:String
    },
    rules: {
        url:String,
        resource:String
    },
    option_set:{
        url:String,
        resource:String
    },
    options:{
        url:String,
        resource:String
    },
    tax_class:{
        url:String,
        resource:String
    },
    reviews:{
        url:String,
        resource:String
    },
    metadata:[String]
});

module.exports=mongoose.model("pro_msts",productSchema);