function TCRSDataRecord(e,a,b,c,d){this.dataSet=e;this.rows=[];this.doLoaded=false;this.columnList=b;if(b!=undefined){this.arr_column_list=b.split(";")}this.condExpr=c;this.tabName=a;this.orderExpr=d;this.cursor=0}TCRSDataRecord.prototype={loadData:function(a){if(this.doLoaded){return}var b="select "+this.columnList+" from "+this.tabName;if(this.condExpr!=""){b+=" where "+this.condExpr}if(this.orderExpr!=""){b+=" order by "+this.orderExpr}this.dataSet.execQuery(b,this.loadDataCB,this,a);this.doLoaded=true},loadDataCB:function(a,c){var b=c.rows;$.each(a,function(d,e){b.push(e)})},isEmpty:function(){return this.rows.length==0},EOF:function(){return this.rows.length<=this.cursor},first:function(){this.cursor=0;return this.rows[this.cursor]},next:function(){++this.cursor;if(this.EOF()){return null}else{return this.rows[this.cursor]}},length:function(){return this.rows.length},search:function(b,a){var e=this.cursor;if(!this.isEmpty()){var d=this.first();while(!this.EOF()){if(d[b]==a){this.cursor=e;return d}d=this.next()}}this.cursor=e;return null},multi_search:function(b,f){var j=this.cursor;if(!this.isEmpty()){var h=this.first();while(!this.EOF()){for(var e=0,a=b.length;e<a;e++){var g=b[e],d=f[e];if(h[g]!=d){break}}if(e==b.length){this.cursor=j;return h}h=this.next()}}this.cursor=j;return null},get_nth_by_col_name:function(a){return indexOf(this.arr_column_list,a)}};
