/***
 * @author hjj
 * @function 创建不规则table
 */
function TableApp(){
		TableApp.prototype.appendTR = function( _tId, _trPreCellNum, _tdArr){
			var table = document.getElementById(_tId);
			var rowNum = _trPreCellNum.length;
			var temp = 0;
			var maxRowNum = Math.max.apply(null, _trPreCellNum);
			/***
			 * @function 插入行
			 * @param cellBegin 某行在_tdArr数组中的起始位置
			 * 		  cellEnd 某行在_tdArr数组中的末位置
			 */
			for(var i=0;i<rowNum;i++){
				var row = table.insertRow(i);
				var cellBegin = temp;
				var cellEnd = cellBegin+_trPreCellNum[i];
				temp = cellEnd;
				var cellIndex = 0;
				//alert("cellBegin="+cellBegin+",cellEnd="+cellEnd);
				//插入列
				for(var j=cellBegin;j<cellEnd;j++){
					//alert("_tdArr[j]="+_tdArr[j]);
					var cell = row.insertCell(cellIndex);
					//样式设置
					if(_tdArr[j].indexOf("$") >= 0){
						var _style = _tdArr[j].split("$")[1];
						var _styleArr = _style.split(",");
						for(var m in _styleArr){
							//空值不处理
							if(_styleArr[m] != "" || typeof _styleArr[m] == "undefined"){
							//alert(_styleArr[m]);
							var _styleItemArr = _styleArr[m].split(":");
							cell.style[_styleItemArr[0]] = _styleItemArr[1];
								}
							}
						cell.innerHTML = _tdArr[j].split("$")[0];
						//没有css
					}else{
						cell.innerHTML = _tdArr[j];
					}
					cellIndex == 0?cell.className = "firstCol":true;
					j == cellEnd-1?cell.className = cell.className+" lastCol":true;
					i == 0?cell.className = cell.className+" firstRow":true;
					i == rowNum-1?cell.className = cell.className+" lastRow":true;
					cellIndex++;
					}
				//合并单元格
					if(_trPreCellNum[i]<maxRowNum){
						/*for(var k=0;k<maxRowNum-_trPreCellNum[i];k++){
							var cell = row.insertCell(cellIndex);
							cell.innerHTML = "&nbsp;";
							}*/
						var columns = row.cells.length;
						row.cells[columns-1].colSpan = maxRowNum-_trPreCellNum[i]+1+"";
						}
					
				}
			var dateInputs = getElementsByClassName("input","date");
			for(var i in dateInputs){
				dateInputs[i].onclick = function(){
					JTC.setday();
					};
				}
			};
		}

function getElementsByClassName(_tagName,_className){
	var classElements = [];
	var allElements = [];
	allElements = document.getElementsByTagName(_tagName);
	for(var i in allElements){
		if(allElements[i].className == _className){
			classElements.push(allElements[i]);
		}
	}
	return classElements;
}