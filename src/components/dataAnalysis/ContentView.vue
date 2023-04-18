<!--
 * @Descripttion: 越努力越幸运
 * @version: 
 * @Author: https://github.com/akvtion && ifauchard@163.com
 * @Date: 2023-04-14 16:55:00
 * @LastEditors: https://github.com/akvtion && ifauchard@163.com
 * @LastEditTime: 2023-04-18 11:35:53
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
                radius: [20, 140],
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