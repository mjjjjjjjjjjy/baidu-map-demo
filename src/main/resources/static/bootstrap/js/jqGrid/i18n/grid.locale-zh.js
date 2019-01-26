(function($){
/**
 * jqGrid English Translation
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "显示 {0} - {1} 条记录, 共 {2} 条",
		emptyrecords: "没有找到记录",
		loadtext: "加载中...",
		pgtext : "第 {0} 页 共 {1} 页"
	},
	search : {
		caption: "查找...",
		Find: "确定",
		Reset: "重置",
		odata: [{ oper:'=', text:'equal'},{ oper:'<>', text:'not equal'},{ oper:'<', text:'less'},{ oper:'<=', text:'less or equal'},{ oper:'>', text:'greater'},{ oper:'>=', text:'greater or equal'},{ oper:'以XX开始', text:'begins with'},{ oper:'不以XX开始', text:'does not begin with'},{ oper:'in', text:'is in'},{ oper:'ni', text:'is not in'},{ oper:'以XX结尾', text:'ends with'},{ oper:'不以XX结尾', text:'does not end with'},{ oper:'包含', text:'contains'},{ oper:'不包含', text:'does not contain'}],
		groupOps: [	{ op: "并且", text: "all" },	{ op: "或者",  text: "any" }	]
	},
	edit : {
		addCaption: "添加",
		editCaption: "编辑",
		bSubmit: "提交",
		bCancel: "取消",
		bClose: "关闭",
		saveData: "数据已经修改,要保存修改吗?",
		bYes : "是",
		bNo : "否",
		bExit : "取消",
		msg: {
			required:"必填项",
			number:"必须是数字",
			minValue:"请填大于或等于 ",
			maxValue:"请填小于或等于 ",
			email: "e-mail格式不正确 ",
			integer: "请输入整数",
			date: "日期格式错误",
			url: "URL 格式错误 ('http://' 或者 'https://' 开头)",
			nodefined : " 未定义",
			novalue : " 需要返回值！",
			customarray : "自定义函数需要返回数组！",
			customfcheck : "必须有自定义函数!"
			
		}
	},
	view : {
		caption: "显示",
		bClose: "关闭"
	},
	del : {
		caption: "删除",
		msg: "删除选中行?",
		bSubmit: "删除",
		bCancel: "取消"
	},
	nav : {
		edittext: "",
		edittitle: "编辑",
		addtext:"",
		addtitle: "添加",
		deltext: "",
		deltitle: "删除",
		searchtext: "",
		searchtitle: "查找",
		refreshtext: "",
		refreshtitle: "刷新",
		alertcap: "警告",
		alerttext: "请选择行",
		viewtext: "",
		viewtitle: "查看"
	},
	col : {
		caption: "显示/隐藏列",
		bSubmit: "提交",
		bCancel: "取消"
	},
	errors : {
		errcap : "错误",
		nourl : "没有设置url",
		norecords: "没有记录",
		model : "加载数据出错"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames : [ "日", "一", "二", "三", "四", "五", "六", "星期日", "星期一",
							"星期二", "星期三", "星期四", "星期五", "星期六", ],
			monthNames : [ "1", "2", "3", "4", "5", "6", "7", "8", "9",
					"10", "11", "12", "一月", "二月", "三月", "四月", "五月", "六月",
					"七月", "八月", "九月", "十月", "十一月", "十二月" ],
			AmPm : [ "am", "pm", "AM", "PM" ],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'n/j/Y',
			parseRe : /[Tt\\\/:_;.,\t\s-]/,
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				// short date:
				//    n - Numeric representation of a month, without leading zeros
				//    j - Day of the month without leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				// example: 3/1/2012 which means 1 March 2012
				ShortDate: "n/j/Y", // in jQuery UI Datepicker: "M/d/yyyy"
				// long date:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, F d, Y", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				FullDateTime: "l, F d, Y g:i:s A", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy h:mm:ss tt"
				// month day:
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				MonthDay: "F d", // in jQuery UI Datepicker: "MMMM dd"
				// short time (without seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				ShortTime: "g:i A", // in jQuery UI Datepicker: "h:mm tt"
				// long time (with seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				LongTime: "g:i:s A", // in jQuery UI Datepicker: "h:mm:ss tt"
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			},
			reformatAfterEdit : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);