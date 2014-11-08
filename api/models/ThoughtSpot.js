/**
* ThoughtSpot.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title : {
      type : 'string',
      required : true
    },
    loc_lat : {
      type : 'float',
      required : true
    },
    loc_long : {
      type : 'float',
      required : true
    },
    address_1 : {
      type : 'string',
      required : true
    },
    address_2 : {
      type : 'string'
    },
    city : {
      type : 'string'
    },
    hours_mo_open : {type:'float'},
    hours_mo_close : {type:'float'},
    hours_tu_open : {type:'float'},
    hours_tu_close : {type:'float'},
    hours_we_open : {type:'float'},
    hours_we_close : {type:'float'},
    hours_th_open : {type:'float'},
    hours_th_close : {type:'float'},
    hours_fr_open : {type:'float'},
    hours_fr_close : {type:'float'},
    hours_sa_open : {type:'float'},
    hours_sa_close : {type:'float'},
    hours_su_open : {type:'float'},
    hours_su_close : {type:'float'}
  }
};

