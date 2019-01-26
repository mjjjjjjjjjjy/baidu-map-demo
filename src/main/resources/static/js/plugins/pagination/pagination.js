/**
* 列表数据插件
* @author Sea
* @param {function} 匿名函数
* @param {function} factory 传给自己
* @retutn object
* @date 2016-10-20
*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global.Pagination = factory());
}(this, function () {
    'use strict';

    var pageTimes = 0;

	//创建构造式对象
	var pagination = function(options, callbackFun) {
        /*--------------------------------------------------------------
         | 参数初始化值
         |--------------------------------------------------------------
        */
        options.pageOptions = {};

        //判断是否设置了列表分页DOM
        if (options.uiPagination === undefined) {
            throw new Error('未填写参数：uiPagination');
        } else {
            var pageSelector = '[ui-pagination="'+ options.uiPagination +'"]';
        }

        //判断是否设置了angular的$http请求对象
        if (options.$http === undefined) {
            throw new Error('未填写参数：$http');
        }

        //判断是否设置了请求URL
        if (options.url === undefined) {
            throw new Error('未填写参数：url');
        }

        //是否设置了页码
        if (options.paginationPageNumber === undefined) {
            options.pageOptions.pageNumber = 1;
        } else {
            options.pageOptions.pageNumber = options.paginationPageNumber;
        }

        //是否设置了每页多少条
        if (options.paginationPageSize === undefined) {
            options.pageOptions.pageSize = 25;
        } else {
            options.pageOptions.pageSize = options.paginationPageSize;
        }

        //是否设置了每页多少条数组
        if (options.paginationPageSizes === undefined) {
            options.pageOptions.pageSizes = [5, 10, 15, 25, 50, 75, 100];
        } else {
            options.pageOptions.pageSizes = options.paginationPageSizes;
        }

        //列表对象
        var listOb = {
            pageParams: {
                pageNumber: options.pageOptions.pageNumber,
                pageSize: options.pageOptions.pageSize
            },
            pageOptions: options.pageOptions,

            //获取列表数据
            /**
             * 获取列表数据
             * @author Sea
             * @param {object} pageParams 页码、条数、过滤、排序
             //* @param {function} callbackFun 分页回调
             * @date 2018-10-13
             * @return void
             */
            getPage: function (pageParams) {
                pageParams.pageNumber = (pageParams.pageNumber - 1);

                options.$http.get(options.url, {
                    params: pageParams
                }).success(function (response, status, headers, congfig) {
                    if (callbackFun) {
                        callbackFun(response);
                        pageParams.pageNumber = (pageParams.pageNumber + 1);

                        if (response.data.length) {
                            var html = ''; //分页DOM
                            var inventoryHtml = ''; //分页清单信息DOM

                            /*--------------------------------------------------------------
                             | 分页拼接
                             |--------------------------------------------------------------
                            */
                            //如果有数据
                            if (Number(response.total) > 0) {
                                //如果小于每页显示多少条
                                if (Number(response.total) < Number(pageParams.pageSize)) {
                                    //首页
                                    html += '<button class="item" disabled>'+
                                        '<i class="fa fa-step-backward" data-name="start"></i>'+
                                        '</button>';

                                    //上一页
                                    html += '<button class="item mg-l-5" data-name="prev" disabled>'+
                                        '<i class="fa fa-caret-left mg-font-18"></i>'+
                                        '</button>';

                                    //表单页码
                                    html += '<input type="number" value="'+ pageParams.pageNumber +'" class="mg-l-5 pageNumber" />';

                                    //当前页
                                    html += '<span class="current-pageNumber mg-l-5"> / '+ 0 +'</span>';

                                    //下一页
                                    html += '<button type="button" class="item mg-l-5" data-name="next" disabled>'+
                                        '<i class="fa fa-caret-right mg-font-18 next"></i>'+
                                        '</button>';

                                    //末页
                                    html += '<button class="item mg-l-5" data-name="end" disabled>'+
                                        '<i class="fa fa-step-forward"></i>'+
                                        '</button>';
                                } else {
                                    var recordsTotal = response.total / pageParams.pageSize; //共多少页


                                    //验证分页是否是整数
                                    if (String(recordsTotal).indexOf('.') != -1) {
                                        recordsTotal = parseInt(recordsTotal) + 1;
                                    }

                                    //首页
                                    if (pageParams.pageNumber == 1) {
                                        html += '<button class="item" disabled>'+
                                            '<i class="fa fa-step-backward" data-name="start"></i>'+
                                            '</button>';
                                    } else {
                                        html += '<button class="item btn-hover btn-active" data-name="start">'+
                                            '<i class="fa fa-step-backward"></i>'+
                                            '</button>';
                                    }

                                    //上一页
                                    if (pageParams.pageNumber == 1) {
                                        html += '<button class="item mg-l-5" data-name="prev" disabled>'+
                                            '<i class="fa fa-caret-left mg-font-18"></i>'+
                                            '</button>';
                                    } else {
                                        html += '<button class="item btn-hover btn-active mg-l-5" data-name="prev">'+
                                            '<i class="fa fa-caret-left mg-font-18"></i>'+
                                            '</button>';
                                    }

                                    //表单页码
                                    html += '<input type="number" value="'+ pageParams.pageNumber +'" class="mg-l-5 pageNumber" />';

                                    //当前页
                                    html += '<span class="current-pageNumber mg-l-5"> /  '+ recordsTotal +'</span>';


                                    //下一页
                                    if (pageParams.pageNumber == recordsTotal) {
                                        html += '<button type="button" class="item mg-l-5" data-name="next" disabled>'+
                                            '<i class="fa fa-caret-right mg-font-18 next"></i>'+
                                            '</button>';
                                    } else {
                                        html += '<button type="button" class="item btn-hover btn-active mg-l-5" data-name="next">'+
                                            '<i class="fa fa-caret-right mg-font-18 next"></i>'+
                                            '</button>';
                                    }

                                    //末页
                                    if (pageParams.pageNumber == recordsTotal) {
                                        html += '<button class="item mg-l-5" data-name="end" disabled>'+
                                            '<i class="fa fa-step-forward"></i>'+
                                            '</button>';
                                    } else {
                                        html += '<button class="item btn-hover btn-active mg-l-5" data-name="end">'+
                                            '<i class="fa fa-step-forward"></i>'+
                                            '</button>';
									}

                                    //选择每页多少条
                                    html += '<select class="pageSize mg-l-5">';
                                        for (var i in listOb.pageOptions.pageSizes) {
                                            if (listOb.pageOptions.pageSizes[i] == pageParams.pageSize) {
                                                html += '<option vlaue="'+ listOb.pageOptions.pageSizes[i] +'" selected>'+ listOb.pageOptions.pageSizes[i] +'</option>';
                                            } else {
                                                html += '<option vlaue="'+ listOb.pageOptions.pageSizes[i] +'">'+ listOb.pageOptions.pageSizes[i] +'</option>';
                                            }
                                        }

                                    html += '</select>';
                                }

                                //分页清单
                                var startPageSize = pageParams.pageNumber == 1 ? 1 : ((pageParams.pageNumber - 1) * pageParams.pageSize) + 1;
								var endPageSize = pageParams.pageNumber == 1 ? response.data.length : ((pageParams.pageNumber - 1) * pageParams.pageSize) + response.data.length;
                                inventoryHtml += '共 '+ response.total +' 行';
                            } else {
                                html += '<li class="disabled" data-status="off" data-name="prev">'+
                                    '<a>上一页</a>'+
                                    '</li>'+
                                    '<li class="disabled" data-status="off" data-name="next">'+
                                    '<a class="next">下一页</a>'+
                                    '</li>';

                                //分页清单
                                inventoryHtml += '';
                            }

                            var returnHtml = '<div id="paginations" class="pagination">' +
								'<div class="pagination-page inline-block">' +
									html+
								'</div>' +
                                '<div class="pagination-total inline-block">' +
                                inventoryHtml+
                                '</div>' +
								'</div>';

                            $(pageSelector).find('.pagination').remove();
                            $(pageSelector).remove('.pagination').append(returnHtml);

                            /*--------------------------------------------------------------
                             | 分页按钮操作
                             |--------------------------------------------------------------
                            */
                            //点击分页按钮
                            $(document).off('click', pageSelector +' .pagination .pagination-page button');
                            //点击分页
                            $(document).on('click', pageSelector +' .pagination .pagination-page button', function() {
                                var buttonDom = $(this);
                                clearInterval(pageTimes);

                                pageTimes = setTimeout(function() {
                                    //首页
                                    if (buttonDom.attr('data-name') == 'start') {
                                        pageParams.pageNumber = 1;
                                    } else if (buttonDom.attr('data-name') == 'prev') {//上一页
                                        pageParams.pageNumber = pageParams.pageNumber - 1;
                                    } else if (buttonDom.attr('data-name') == 'next') {//下一页
                                        pageParams.pageNumber = pageParams.pageNumber + 1;
                                    } else if (buttonDom.attr('data-name') == 'end') {//末页
                                        pageParams.pageNumber = recordsTotal;
                                    }

                                    listOb.getPage(pageParams);
                                }, 1000);
                            });

                            //点击输入页码表单
                            $(document).off('input', pageSelector +' .pagination .pagination-page input.pageNumber');
                            $(document).on('input', pageSelector +' .pagination .pagination-page input.pageNumber', function() {
                                var pageNumber = $(this).val();

                                if (pageNumber == '') {
                                    $(this).val(1);
                                    pageParams.pageNumber = 1;
                                    listOb.getPage(pageParams);
                                } else {
                                    clearInterval(pageTimes);

                                    pageTimes = setTimeout(function() {
                                        pageParams.pageNumber = pageNumber;
                                        listOb.getPage(pageParams);
                                    }, 1000);
                                }
                            });

                            //每页多少条
                            $(document).off('change', pageSelector +' .pagination .pagination-page select.pageSize');
                            $(document).on('change', pageSelector +' .pagination .pagination-page select.pageSize', function() {
                                var pageSize = $(this).find('option:checked').val()
                                clearInterval(pageTimes);

                                pageTimes = setTimeout(function() {
                                    pageParams.pageSize = pageSize;
                                    listOb.getPage(pageParams);
                                }, 1000);
                            });
						} else {
                            $(pageSelector).find('.pagination').remove();
                        }
                    } else {
                        throw new Error('列表未填写参数');
                    }
                });

            },
            //刷新
            refresh: function () {
                this.getPage(this.pageParams);
            }
        }

        //是否设置了传参
        if (options.data === undefined) {
            options.data = {};
        } else {
            listOb.pageParams = Object.assign(options.data, listOb.pageParams);
        }

        //初始化请求列表
        listOb.getPage(listOb.pageParams);

		return listOb;
	}

	return pagination;
}));
