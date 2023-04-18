<!--
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-04-12 16:16:48
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-18 21:57:40
-->
<template>
    <div class="data-view">
        <el-card>
            <div id="main1"></div>
        </el-card>
        <el-card>
            <div id="main2"></div>
        </el-card>
        
    </div>
</template>
<script>
import { dataview,getCountView } from '@/api/dataApi'

export default {
    data() {
        return {}
    },
    created() {
        // 玫瑰花图表的绘制
        dataview().then(res => {
            if(res.data.code === 200) {
                console.log( res.data.data.series )
                let result = res.data.data.series
                this.draw(result)
            }
        }).catch(err => {
            throw err
        }),
        // 压力图表的绘制
        getCountView().then(res => {
            if(res.data.code === 200) {
                console.log( res.data.data.series )
                let resu = res.data.data.series
                this.draw2(resu)
            }
        }).catch(err => {
            throw err
        })
    },
    
    methods: {
        draw(result) {
            console.log("result",result.value);
            let myChart = this.$echarts.init(document.getElementById('main1'))
            let option = {
                title: {
                text: '统计每个朝代文章的数量',
                subtext: 'Fake Data',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                top: 'bottom',
                data: [
                
                ]
            },
            toolbox: {
                show: true,
                feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
                }
            },
            series: [
                {
                name: '数量',
                type: 'pie',
                radius: [70, 140],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 5
                },
                data: [
                ]
                }
            ]
            }

            result.forEach(item => {
                    option.series[0].data.push({name:item.name,value:item.value})
            }),
            myChart.setOption(option)
        },
        draw2(resu) {
            console.log("result",resu.value);
            let myChart2 = this.$echarts.init(document.getElementById('main2'))
            let option = {
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                    name: '古诗数量',
                    type: 'gauge',
                    progress: {
                        show: true
                    },
                    detail: {
                        valueAnimation: true,
                        formatter: '{value}'
                    },
                    data: [
                        {
                        value: resu.value,
                        name: '古诗数量'
                        }
                    ]
                    }
                ]
            }
            myChart2.setOption(option)
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
        #main1,#main2{
            height: 500px;
        }
    }
}
</style>