<!--
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-04-12 16:16:48
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-14 15:00:11
-->
<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        
    </div>
</template>
<script>
import { dataview } from '@/api/api'

export default {
    data() {
        return {}
    },
    created() {
        // 图表的绘制
        dataview().then(res => {
            if(res.data.code === 200) {
                console.log( res.data.data.series )
                let result = res.data.data.series
                this.draw(result)
            }
        }).catch(err => {
            throw err
        })
    },
    /* mounted() {
        this.draw();
        let myChart = this.$echarts.init(document.getElementById('main1'))
        myChart.setOption({
            legend:{
                    top:'bottom'
            },
            title: {
                text: '统计每个朝代文章的数量'
            },
            series: [{
                name: '统计每个朝代文章的数量',
                type: 'pie',
                radius:[50,250],
                center:['50%','50%'],
                roseType:'area',
                itemStyle:{
                    borderRadius:8
                },
                data: [ 
                    {value:40,name:"rose1"},
                {value:11,name:"rose2"},
                {value:55,name:"rose3"},
                {value:77,name:"rose4"},
            ]
            }]
        })
    },*/
    methods: {
        draw(result) {
            console.log("result",result);
            let myChart = this.$echarts.init(document.getElementById('main1'))
            let option = {
                legend:{
                    top:'bottom'
                },
                /*
                * toolbox为工具栏；提供导出图片，数据转化，动态数据等信息
                * 保存图片
                */
                title: {
                    text: '统计每个朝代文章的数量'
                },
                toolbox:{
                    show:true,
                    feature:{
                        mark:{show:true},
                        dataview:{show:true,readOnly:false},
                        restore:{show:true},
                        saveAsImage:{show:true}
                    }
                },
                series: [{
                    name: '统计每个朝代文章的数量',
                    type: 'pie',
                    radius:[50,200],
                    center:['50%','50%'],
                    roseType:'area',
                    itemStyle:{
                        borderRadius:8
                    },
                    data:[
                        // {value:40,name:"rose1"},
                    ]
                }]
            }
            result.forEach(item => {
                option.series[0].data.push({name:item.name,value:item.value})
            })
            myChart.setOption(option)
        },
    }
}
</script>
<style lang="scss">
.data-view {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .el-card {
        width: 50%;
        #main1{
            height: 500px;
        }
    }
}
</style>