<template>
    <div class='completion'>
        <mt-header class="completion-header" fixed title="完成情况">
            <mt-button @click="Back" slot="left"  icon="back"></mt-button>
            <mt-button @click="select()" class='selectText' slot="right">选择：{{selectText}}</mt-button>
        </mt-header>
        <mt-popup v-model="alertPop" class="mint-popup">
			<div class="list" v-for="(item,i) in selectData" :key="item.id"  @click="selectOne(item.text,item.id)">
				{{item.text}}
			</div>
			<div class="list" @click="alertPop = false">
				取消
			</div>
		</mt-popup> 
        <div class="page-tab-container">
            <div class='tab-con'>
                <div class='tab-top'>
                    <div id="container" class='container'></div>
                    <div id="containerLeft" class='containerLeft'></div>
                    <div id="containerRight" class='containerRight'></div>
                </div>
                <mt-navbar class="page-part" v-model="selected">
                    <mt-tab-item id="1">完成人员</mt-tab-item>
                    <mt-tab-item id="2">未完成人员</mt-tab-item>
                </mt-navbar>
                <mt-tab-container v-model="selected">
                    <mt-tab-container-item id="1">
                        <div class='complete-box' v-for="(item,i) in completeData" :key="item.id">
                            <div class='complete-left'>
                                <img class='complete-left-img' :src='item.img'>
                            </div>
                            <div class='complete-con'>
                                <p class='complete-con-top'><span>{{item.name}}</span><span class='complete-class'>{{item.class}}</span></p>
                                <p class='complete-con-bom'><span>{{item.time}}</span></p>
                            </div>
                            <div class='complete-right'>
                                <router-link :to="{path:item.state=='004002'?'correctComposition':'evaluated',query:{id:item.id}}">
                                    <img v-if="item.state=='004002'" class='complete-right-img' src="../../static/img/bianji.png">
                                    <img v-else class='complete-right-img' src="../../static/img/chakan.png">
                                </router-link>
                            </div>
                        </div>
                    </mt-tab-container-item>
                    <mt-tab-container-item id="2">
                        <div class='complete-box' v-for="(item,i) in notcompleteData" :key="item.id">
                            <div class='complete-left'>
                                <img class='complete-left-img' :src='item.img'>
                            </div>
                            <div class='notcompleteData-con'>
                                <p class='notcompleteData-p'>{{item.name}}</p>
                                <p class='notcompleteData-p'>{{item.class}}</p>
                            </div>
                        </div>
                    </mt-tab-container-item>
                </mt-tab-container>
            </div>
        </div>
    </div>
</template>
<script>
    import Highcharts from 'highcharts/highstock';
    import HighchartsMore from 'highcharts/highcharts-more';
    import HighchartsDrilldown from 'highcharts/modules/drilldown';
    import Highcharts3D from 'highcharts/highcharts-3d';
    import Solidgauge from 'highcharts/modules/solid-gauge';
    
    HighchartsMore(Highcharts)
    Solidgauge(Highcharts)
    HighchartsDrilldown(Highcharts);
    Highcharts3D(Highcharts);

    export default {
        name: 'completion',
        components: {},
        data () {
            return {
                active: 'tab-container1',
                selected: '1',
                completionData:100,
                completeData:[],
                notcompleteData:[],
                bianJi: '../../static/img/bianji.png',
                chaKan: '../../static/img/chakan.png',
                chart:null,
                options:{
                   chart: {
                        type: 'solidgauge',
                        height: 200,
                        backgroundColor:'#384267',
                        borderColor:'#384267',
                        borderRadius:'50px'
                    },
                    title: null,
                    pane: {
                        center: ['50%', '60%'],
                        size: '100%',
                        startAngle: 240,
                        endAngle: 480,
                        background: {
                            innerRadius: '90%',
                            outerRadius: '100%',
                            shape: 'arc',
                            borderWidth: 0
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                    // the value axis
                    yAxis: {
                        min: 0,
                        max: 0,
                        stops: [
                            [0, '#fe4c76'], 
                            [0.5, '#f5b284'], 
                            [1, '#fe4c76'] 
                        ],
                        lineWidth: 0,
                        minorTickInterval: null,
                        tickPixelInterval: 400,
                        tickWidth: 0,
                        title: {
                            y: -70
                        },
                        labels: {
                            y: 16
                        },
                        tickPositions: [],
                        plotBands: [{
                            from: 0,
                            to: 0,
                            thickness: '10%',
                            color: '#6a89f4' //green
                        }]
                    },
                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                y: 5,
                                borderWidth: 0,
                                useHTML: true
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '人数',
                        data: [
                            {
                                radius: '90%',
                                innerRadius: '100%',
                                y:0
                            }
                        ],
                        dataLabels: {
                            y:-30,
                            formatter: function () {
                                var nums = 0
                                return '<span style="color:#fff;width: 100%;display: inline-block;text-align:center;">  </span><br/>'+'<span style="display:block;width:100%;height:1px;border-bottom:1px solid #fea405"></span>' +
                                    '<span style="color:#fff">总人数：'+nums+'</span>';
                            }
                        },
                    }]
                },
                optionsLeft:{
                   chart: {
                        type: 'solidgauge',
                        backgroundColor:'#384267',
                        borderColor:'#384267',
                        borderRadius:'50px'
                    },
                    title:{
                        text:'已提交人数',
                        align:'center',
                        floating:true,
                        y:80,
                        style: {
                            color: '#969caf',
                            fontSize: "12px"
                        }
                    },
                    pane: {
                        startAngle: 0,
                        endAngle: 360,
                        center: ['50%', '30%'],
                        size: '40%',
                        background: [{ // Track for Move
                            outerRadius: '112%',
                            innerRadius: '88%',
                            backgroundColor:'#444566',
                            borderWidth: 0
                        }]
                    },
                    yAxis: {
                        min: 0,
                        max: 0,
                        lineWidth: 0,
                        tickPositions: []
                    },
                    tooltip: {
                        enabled: false
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        solidgauge: {
                            borderWidth: '.2rem',
                            dataLabels: {
                                enabled: true
                            },
                        }
                    },
                    series: [{
                        borderColor: {
                            linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                            stops: [
                                [0, '#fe6e8f'],
                                [0.2, '#fe6e8f'],
                                [0.4, '#fe6e8f'],
                                [0.8, '#fe6e8f'],
                                [1, '#f5b283']
                            ]
                        },
                        data: [{
                            color: Highcharts.getOptions().colors[0],
                            innerRadius: '100%',
                            y:30,
                            dataLabels: {
                                borderColor: undefined,
                                color:'#fff',
                                borderWidth: 0,
                                padding: 0,
                                shadow: false,
                                y:0,
                                 format: '{y} 人'
                            }
                        }],
                    }]
                },
                optionsRight:{
                   chart: {
                        type: 'solidgauge',
                        backgroundColor:'#384267',
                        borderColor:'#384267',
                        borderRadius:'50px'
                    },
                     title:{
                        text:'未提交人数',
                        align:'center',
                        floating:true,
                        y:80,
                        style: {
                            color: '#969caf',
                            fontSize: "12px"
                        }
                    },
                    pane: {
                        startAngle: 0,
                        endAngle: 360,
                        center: ['50%', '30%'],
                        size: '40%',
                        background: [{ // Track for Move
                            outerRadius: '112%',
                            innerRadius: '88%',
                            backgroundColor:'#444566',
                            borderWidth: 0
                        }]
                    },
                    yAxis: {
                        min: 0,
                        max: 0,
                        lineWidth: 0,
                        tickPositions: []
                    },
                     tooltip: {
                        enabled: false
                    },
                     credits: {
                        enabled: false
                    },
                    plotOptions: {
                        solidgauge: {
                            borderWidth: '.2rem',
                            dataLabels: {
                                enabled: true
                            },
                        }
                    },
                    series: [{
                        borderColor: {
                            linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                            stops: [
                                [0, '#6987f5'],
                                [0.2, '#6987f5'],
                                [0.4, '#6987f5'],
                                [0.8, '#6987f5'],
                                [1, '#92c7e6']
                            ]
                        },
                        data: [{
                            color: Highcharts.getOptions().colors[0],
                            innerRadius: '100%',
                            y:10,
                            dataLabels: {
                                borderColor: undefined,
                                color:'#fff',
                                borderWidth: 0,
                                padding: 0,
                                shadow: false,
                                y:0,
                                 format: '{y} 人'
                            }
                        }],
                    }]
                },
                falg:true,
                alertPop:false,
                selectData:[],
                selectText:'',
            }
        },
        created:function(){
            this.$store.state.showBottomNav=false;
            this.$store.state.showTopNav=false
            let url = this.$store.state.url;
            this.$http.get(url+'/teacher1/task/getClassByTaskId',{ 
                params:{'taskId': this.$route.query.id } 
            }).then(response => { 
                
                let data=response.body.dto
                let l=response.body.dto.length
                let selectData=[]
                selectData.push({
                        "text":"全部",
                        'id':0
                    })
                for(let i=0;i<data.length;i++){
                    selectData.push({
                        "text":data[i].gradeName+data[i].className,
                        'id':data[i].classId
                    })
                }
                // console.log(selectData)
                // this.selectText=data[0].gradeClass
                this.selectText="全部"
                this.selectData=selectData
            })

        },	
        mounted:function(){
            this.$store.state.showBottomNav=false;
            this.$store.state.showTopNav=false
            new Highcharts.Chart('container',this.options);
            new Highcharts.Chart('containerLeft',this.optionsLeft);
            new Highcharts.Chart('containerRight',this.optionsRight);
            let l=this.completionData;
            for(let i=1;i<=l;i++){
                if(i==1){
                    let selectNav='.nav-container'+i
                    $(selectNav).css("background-color","black");
                }else{
                    let selectNav='.nav-container'+i
                    $(selectNav).css("background-color","white");
                }
            }
            let url = this.$store.state.url;
            this.$http.get(url+'/teacher1/task/taskCompletion',{ 
                params:{'id': this.$route.query.id } 
            }).then(response =>{
                console.log(response)
                let data=response.body.dto
                for(let i=0;i<data.length;i++){
                $('#container').highcharts({
                    chart: {
                            type: 'solidgauge',
                            height: 200,
                            backgroundColor:'#384267',
                            borderColor:'#384267',
                            borderRadius:'50px'
                        },
                        title: null,
                        pane: {
                            center: ['50%', '60%'],
                            size: '100%',
                            startAngle: 240,
                            endAngle: 480,
                            background: {
                                innerRadius: '90%',
                                outerRadius: '100%',
                                shape: 'arc',
                                borderWidth: 0
                            }
                        },
                        tooltip: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            max: data[0].completeNum+data[0].notCompleteNum,
                            stops: [
                                [0, '#fe4c76'], 
                                [0.5, '#f5b284'], 
                                [1, '#fe4c76'] 
                            ],
                            lineWidth: 0,
                            minorTickInterval: null,
                            tickPixelInterval: 400,
                            tickWidth: 0,
                            title: {
                                y: -70
                            },
                            labels: {
                                y: 16
                            },
                            tickPositions: [],
                            plotBands: [{
                                from: 0,
                                to: data[0].completeNum+data[0].notCompleteNum,
                                thickness: '10%',
                                color: '#6a89f4' // green
                            }]
                        },
                        plotOptions: {
                            solidgauge: {
                                dataLabels: {
                                    y: 5,
                                    borderWidth: 0,
                                    useHTML: true
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: '人数',
                            data: [
                                {
                                    radius: '90%',
                                    innerRadius: '100%',
                                    y:data[0].completeNum
                                }
                            ],
                            dataLabels: {
                                y:-30,
                                formatter: function () {
                                    var text="全部"
                                    var nums = data[0].completeNum+data[0].notCompleteNum
                                    return '<span style="color:#fff;width: 100%;display: inline-block;text-align:center;">'+text+' </span><br/>'+'<span style="display:block;width:100%;height:1px;border-bottom:1px solid #fea405"></span>' +
                                        '<span style="color:#fff">总人数：'+nums+'</span>';
                                }
                            },
                        }]
                    }); 
                    $('#containerLeft').highcharts({
                        chart: {
                            type: 'solidgauge',
                            backgroundColor:'#384267',
                            borderColor:'#384267',
                            borderRadius:'50px'
                        },
                        title:{
                            text:'已提交人数',
                            align:'center',
                            floating:true,
                            y:70,
                            style: {
                                color: '#969caf',
                                fontSize: "12px"
                            }
                        },
                        pane: {
                            startAngle: 0,
                            endAngle: 360,
                            center: ['50%', '25%'],
                            size: '40%',
                            background: [{ // Track for Move
                                outerRadius: '112%',
                                innerRadius: '88%',
                                backgroundColor:'#444566',
                                borderWidth: 0
                            }]
                        },
                        yAxis: {
                            min: 0,
                            max: data[0].total,
                            lineWidth: 0,
                            tickPositions: []
                        },
                        tooltip: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            solidgauge: {
                                borderWidth: '.2rem',
                                dataLabels: {
                                    enabled: true
                                },
                            }
                        },
                        series: [{
                            borderColor: {
                                linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                stops: [
                                    [0, '#fe6e8f'],
                                    [0.2, '#fe6e8f'],
                                    [0.4, '#fe6e8f'],
                                    [0.8, '#fe6e8f'],
                                    [1, '#f5b283']
                                ]
                            },
                            data: [{
                                color: Highcharts.getOptions().colors[0],
                                innerRadius: '100%',
                                y:data[0].completeNum,
                                dataLabels: {
                                    borderColor: undefined,
                                    color:'#fff',
                                    borderWidth: 0,
                                    padding: 0,
                                    shadow: false,
                                    y:60,
                                    format: '{y} 人'
                                }
                            }],
                        }]
                    })
                    $('#containerRight').highcharts({
                        chart: {
                            type: 'solidgauge',
                            backgroundColor:'#384267',
                            borderColor:'#384267',
                            borderRadius:'50px'
                        },
                        title:{
                            text:'未提交人数',
                            align:'center',
                            floating:true,
                            y:70,
                            style: {
                                color: '#969caf',
                                fontSize: "12px"
                            }
                        },
                        pane: {
                            startAngle: 0,
                            endAngle: 360,
                            center: ['50%', '25%'],
                            size: '40%',
                            background: [{ // Track for Move
                                outerRadius: '112%',
                                innerRadius: '88%',
                                backgroundColor:'#444566',
                                borderWidth: 0
                            }]
                        },
                        yAxis: {
                            min: 0,
                            max:data[0].total,
                            lineWidth: 0,
                            tickPositions: []
                        },
                        tooltip: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            solidgauge: {
                                borderWidth: '.2rem',
                                dataLabels: {
                                    enabled: true
                                },
                            }
                        },
                        series: [{
                            borderColor: {
                                linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                stops: [
                                    [0, '#6987f5'],
                                    [0.2, '#6987f5'],
                                    [0.4, '#6987f5'],
                                    [0.8, '#6987f5'],
                                    [1, '#92c7e6']
                                ]
                            },
                            data: [{
                                color: Highcharts.getOptions().colors[0],
                                innerRadius: '100%',
                                y:data[0].notCompleteNum,
                                dataLabels: {
                                    borderColor: undefined,
                                    color:'#fff',
                                    borderWidth: 0,
                                    padding: 0,
                                    shadow: false,
                                    y:60,
                                    format: '{y} 人'
                                }
                            }],
                        }]
                    })
                    let completeData=data[0].completeStudent
                        if(completeData.length>0){
                            for(let i=0;i<completeData.length;i++){
                                let year=new Date(completeData[i].completeTime).getFullYear()
                                let mon=new Date(completeData[i].completeTime).getMonth()+1
                                let day=new Date(completeData[i].completeTime).getDate()
                                let hours=new Date(completeData[i].completeTime).getHours()
                                let minutes=new Date(completeData[i].completeTime).getMinutes()
                                let seconds=new Date(completeData[i].completeTime).getSeconds()
                                let time = year+"-"+mon+"-"+day+" "+hours+":"+minutes+":"+seconds

                                this.completeData.push({
                                    id:completeData[i].compositionId,
                                    name:completeData[i].name,
                                    class:completeData[i].grade+completeData[i].className,
                                    time:time,
                                    img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg',
                                    state:completeData[i].isComment
                                })
                            }
                        }
                        let notCompleteStudent=data[0].notCompleteStudent
                        if(notCompleteStudent.length>0){
                            for(let i=0;i<notCompleteStudent.length;i++){
                                this.notcompleteData.push({
                                    id:notCompleteStudent[i].compositionId,
                                    name:notCompleteStudent[i].name,
                                    class:notCompleteStudent[i].grade+notCompleteStudent[i].className,
                                    img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg'
                                })
                            }
                        }
                } 
            })
            
        },
        updated: function () {
            let select = this.active.replace(/[^0-9]/ig,""); 
            let l=this.completionData;
            for(let i=1;i<=l;i++){
                if(i==select){
                    let selectNav='.nav-container'+i
                    $(selectNav).css("background-color","black");
                }else{
                    let selectNav='.nav-container'+i
                    $(selectNav).css("background-color","white");
                }
            }
        },
        methods:{
            Back(){
                this.$router.go(-1)
            },
            select(){
                this.alertPop=true
            },
            selectOne(t,n){
                let text=t
                this.selectText=text
                let select=n
                if(select!=0){
                let url = this.$store.state.url;
                this.$http.get(url+'/teacher1/task/taskCompletion',{ 
                    params:{'id': this.$route.query.id,'classId': select } 
                }).then(response =>{
                    let data=response.body.dto[0]
                    let total=data.completeNum+data.notCompleteNum
                    if(total==0){
                        $('#container').highcharts({
                    chart: {
                            type: 'solidgauge',
                            height: 200,
                            backgroundColor:'#384267',
                            borderColor:'#384267',
                            borderRadius:'50px'
                        },
                        title: null,
                        pane: {
                            center: ['50%', '60%'],
                            size: '100%',
                            startAngle: 240,
                            endAngle: 480,
                            background: {
                                innerRadius: '90%',
                                outerRadius: '100%',
                                shape: 'arc',
                                borderWidth: 0
                            }
                        },
                        tooltip: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            max:100,
                            stops: [
                                [0, '#fe4c76'], 
                                [0.5, '#f5b284'], 
                                [1, '#fe4c76'] 
                            ],
                            lineWidth: 0,
                            minorTickInterval: null,
                            tickPixelInterval: 400,
                            tickWidth: 0,
                            title: {
                                y: -70
                            },
                            labels: {
                                y: 16
                            },
                            tickPositions: [],
                            plotBands: [{
                                from: 0,
                                to: 100,
                                thickness: '10%',
                                color: '#6a89f4' // green
                            }]
                        },
                        plotOptions: {
                            solidgauge: {
                                dataLabels: {
                                    y: 5,
                                    borderWidth: 0,
                                    useHTML: true
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: '人数',
                            data: [
                                {
                                    radius: '90%',
                                    innerRadius: '100%',
                                    y:0
                                }
                            ],
                            dataLabels: {
                                y:-30,
                                formatter: function () {
                                    return '<span style="color:#fff;width: 100%;display: inline-block;text-align:center;">'+text+' </span><br/>'+'<span style="display:block;width:100%;height:1px;border-bottom:1px solid #fea405"></span>' +
                                        '<span style="color:#fff">总人数：'+total+'</span>';
                                }
                            },
                        }]
                    }); 
                        $('#containerLeft').highcharts({
                            chart: {
                                type: 'solidgauge',
                                backgroundColor:'#384267',
                                borderColor:'#384267',
                                borderRadius:'50px'
                            },
                            title:{
                                text:'已提交人数',
                                align:'center',
                                floating:true,
                                y:80,
                                style: {
                                    color: '#969caf',
                                    fontSize: "12px"
                                }
                            },
                            pane: {
                                startAngle: 0,
                                endAngle: 360,
                                center: ['50%', '30%'],
                                size: '40%',
                                background: [{ // Track for Move
                                    outerRadius: '112%',
                                    innerRadius: '88%',
                                    backgroundColor:'#444566',
                                    borderWidth: 0
                                }]
                            },
                            yAxis: {
                                min: 0,
                                max: 100,
                                lineWidth: 0,
                                tickPositions: []
                            },
                            tooltip: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                solidgauge: {
                                    borderWidth: '.2rem',
                                    dataLabels: {
                                        enabled: true
                                    },
                                }
                            },
                            series: [{
                                borderColor: {
                                    linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                    stops: [
                                        [0, '#fe6e8f'],
                                        [0.2, '#fe6e8f'],
                                        [0.4, '#fe6e8f'],
                                        [0.8, '#fe6e8f'],
                                        [1, '#f5b283']
                                    ]
                                },
                                data: [{
                                    color: Highcharts.getOptions().colors[0],
                                    innerRadius: '100%',
                                    y:0,
                                    dataLabels: {
                                        borderColor: undefined,
                                        color:'#fff',
                                        borderWidth: 0,
                                        padding: 0,
                                        shadow: false,
                                        y:60,
                                        format: '{y} 人'
                                    }
                                }],
                            }]
                        })
                        $('#containerRight').highcharts({
                            chart: {
                                type: 'solidgauge',
                                backgroundColor:'#384267',
                                borderColor:'#384267',
                                borderRadius:'50px'
                            },
                            title:{
                                text:'未提交人数',
                                align:'center',
                                floating:true,
                                y:80,
                                style: {
                                    color: '#969caf',
                                    fontSize: "12px"
                                }
                            },
                            pane: {
                                startAngle: 0,
                                endAngle: 360,
                                center: ['50%', '30%'],
                                size: '40%',
                                background: [{ // Track for Move
                                    outerRadius: '112%',
                                    innerRadius: '88%',
                                    backgroundColor:'#444566',
                                    borderWidth: 0
                                }]
                            },
                            yAxis: {
                                min: 0,
                                max:100,
                                lineWidth: 0,
                                tickPositions: []
                            },
                            tooltip: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                solidgauge: {
                                    borderWidth: '.2rem',
                                    dataLabels: {
                                        enabled: true
                                    },
                                }
                            },
                            series: [{
                                borderColor: {
                                    linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                    stops: [
                                        [0, '#6987f5'],
                                        [0.2, '#6987f5'],
                                        [0.4, '#6987f5'],
                                        [0.8, '#6987f5'],
                                        [1, '#92c7e6']
                                    ]
                                },
                                data: [{
                                    color: Highcharts.getOptions().colors[0],
                                    innerRadius: '100%',
                                    y:0,
                                    dataLabels: {
                                        borderColor: undefined,
                                        color:'#fff',
                                        borderWidth: 0,
                                        padding: 0,
                                        shadow: false,
                                        y:60,
                                        format: '{y} 人'
                                    }
                                }],
                            }]
                        })
                        this.completeData=[]
                        this.notcompleteData=[]
                        // let completeData=data.completeStudent
                        //     if(completeData.length>0){
                        //         for(let i=0;i<completeData.length;i++){
                        //             let year=new Date(completeData[i].completeTime).getFullYear()
                        //             let mon=new Date(completeData[i].completeTime).getMonth()+1
                        //             let day=new Date(completeData[i].completeTime).getDate()
                        //             let hours=new Date(completeData[i].completeTime).getHours()
                        //             let minutes=new Date(completeData[i].completeTime).getMinutes()
                        //             let seconds=new Date(completeData[i].completeTime).getSeconds()
                        //             let time = year+"-"+mon+"-"+day+" "+hours+":"+minutes+":"+seconds
                        //             this.completeData.push({
                        //                 id:completeData[i].compositionId,
                        //                 name:completeData[i].name,
                        //                 class:completeData[i].grade+completeData[i].className,
                        //                 time:time,
                        //                 img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg',
                        //                 state:completeData[i].isComment
                        //             })
                        //         }
                        //     }
                        //     let notCompleteStudent=data.notCompleteStudent
                        //     if(notCompleteStudent.length>0){
                        //         for(let i=0;i<notCompleteStudent.length;i++){
                        //             this.notcompleteData.push({
                        //                 id:notCompleteStudent[i].compositionId,
                        //                 name:notCompleteStudent[i].name,
                        //                 class:notCompleteStudent[i].grade+notCompleteStudent[i].className,
                        //                 img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg'
                        //             })
                        //         }
                        //     }
                    }else{
                        $('#container').highcharts({
                    chart: {
                            type: 'solidgauge',
                            height: 200,
                            backgroundColor:'#384267',
                            borderColor:'#384267',
                            borderRadius:'50px'
                        },
                        title: null,
                        pane: {
                            center: ['50%', '60%'],
                            size: '100%',
                            startAngle: 240,
                            endAngle: 480,
                            background: {
                                innerRadius: '90%',
                                outerRadius: '100%',
                                shape: 'arc',
                                borderWidth: 0
                            }
                        },
                        tooltip: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            max: total,
                            stops: [
                                [0, '#fe4c76'], 
                                [0.5, '#f5b284'], 
                                [1, '#fe4c76'] 
                            ],
                            lineWidth: 0,
                            minorTickInterval: null,
                            tickPixelInterval: 400,
                            tickWidth: 0,
                            title: {
                                y: -70
                            },
                            labels: {
                                y: 16
                            },
                            tickPositions: [],
                            plotBands: [{
                                from: 0,
                                to: total,
                                thickness: '10%',
                                color: '#6a89f4' // green
                            }]
                        },
                        plotOptions: {
                            solidgauge: {
                                dataLabels: {
                                    y: 5,
                                    borderWidth: 0,
                                    useHTML: true
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: '人数',
                            data: [
                                {
                                    radius: '90%',
                                    innerRadius: '100%',
                                    y:data.completeNum
                                }
                            ],
                            dataLabels: {
                                y:-30,
                                formatter: function () {
                                    return '<span style="color:#fff;width: 100%;display: inline-block;text-align:center;">'+text+' </span><br/>'+'<span style="display:block;width:100%;height:1px;border-bottom:1px solid #fea405"></span>' +
                                        '<span style="color:#fff">总人数：'+total+'</span>';
                                }
                            },
                        }]
                    }); 
                        $('#containerLeft').highcharts({
                            chart: {
                                type: 'solidgauge',
                                backgroundColor:'#384267',
                                borderColor:'#384267',
                                borderRadius:'50px'
                            },
                            title:{
                                text:'已提交人数',
                                align:'center',
                                floating:true,
                                y:80,
                                style: {
                                    color: '#969caf',
                                    fontSize: "12px"
                                }
                            },
                            pane: {
                                startAngle: 0,
                                endAngle: 360,
                                center: ['50%', '30%'],
                                size: '40%',
                                background: [{ // Track for Move
                                    outerRadius: '112%',
                                    innerRadius: '88%',
                                    backgroundColor:'#444566',
                                    borderWidth: 0
                                }]
                            },
                            yAxis: {
                                min: 0,
                                max: total,
                                lineWidth: 0,
                                tickPositions: []
                            },
                            tooltip: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                solidgauge: {
                                    borderWidth: '.2rem',
                                    dataLabels: {
                                        enabled: true
                                    },
                                }
                            },
                            series: [{
                                borderColor: {
                                    linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                    stops: [
                                        [0, '#fe6e8f'],
                                        [0.2, '#fe6e8f'],
                                        [0.4, '#fe6e8f'],
                                        [0.8, '#fe6e8f'],
                                        [1, '#f5b283']
                                    ]
                                },
                                data: [{
                                    color: Highcharts.getOptions().colors[0],
                                    innerRadius: '100%',
                                    y:data.completeNum,
                                    dataLabels: {
                                        borderColor: undefined,
                                        color:'#fff',
                                        borderWidth: 0,
                                        padding: 0,
                                        shadow: false,
                                        y:60,
                                        format: '{y} 人'
                                    }
                                }],
                            }]
                        })
                        $('#containerRight').highcharts({
                            chart: {
                                type: 'solidgauge',
                                backgroundColor:'#384267',
                                borderColor:'#384267',
                                borderRadius:'50px'
                            },
                            title:{
                                text:'未提交人数',
                                align:'center',
                                floating:true,
                                y:80,
                                style: {
                                    color: '#969caf',
                                    fontSize: "12px"
                                }
                            },
                            pane: {
                                startAngle: 0,
                                endAngle: 360,
                                center: ['50%', '30%'],
                                size: '40%',
                                background: [{ // Track for Move
                                    outerRadius: '112%',
                                    innerRadius: '88%',
                                    backgroundColor:'#444566',
                                    borderWidth: 0
                                }]
                            },
                            yAxis: {
                                min: 0,
                                max:total,
                                lineWidth: 0,
                                tickPositions: []
                            },
                            tooltip: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                solidgauge: {
                                    borderWidth: '.2rem',
                                    dataLabels: {
                                        enabled: true
                                    },
                                }
                            },
                            series: [{
                                borderColor: {
                                    linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                    stops: [
                                        [0, '#6987f5'],
                                        [0.2, '#6987f5'],
                                        [0.4, '#6987f5'],
                                        [0.8, '#6987f5'],
                                        [1, '#92c7e6']
                                    ]
                                },
                                data: [{
                                    color: Highcharts.getOptions().colors[0],
                                    innerRadius: '100%',
                                    y:data.notCompleteNum,
                                    dataLabels: {
                                        borderColor: undefined,
                                        color:'#fff',
                                        borderWidth: 0,
                                        padding: 0,
                                        shadow: false,
                                        y:60,
                                        format: '{y} 人'
                                    }
                                }],
                            }]
                        })
                        this.completeData=[]
                        this.notcompleteData=[]
                        console.log(this.completeData)
                        let completeData=data.completeStudent
                            if(completeData.length>0){
                                for(let i=0;i<completeData.length;i++){
                                    let year=new Date(completeData[i].completeTime).getFullYear()
                                    let mon=new Date(completeData[i].completeTime).getMonth()+1
                                    let day=new Date(completeData[i].completeTime).getDate()
                                    let hours=new Date(completeData[i].completeTime).getHours()
                                    let minutes=new Date(completeData[i].completeTime).getMinutes()
                                    let seconds=new Date(completeData[i].completeTime).getSeconds()
                                    let time = year+"-"+mon+"-"+day+" "+hours+":"+minutes+":"+seconds
                                    this.completeData.push({
                                        id:completeData[i].compositionId,
                                        name:completeData[i].name,
                                        class:completeData[i].grade+completeData[i].className,
                                        time:time,
                                        img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg',
                                        state:completeData[i].isComment
                                    })
                                }
                            }
                            let notCompleteStudent=data.notCompleteStudent
                            if(notCompleteStudent.length>0){
                                for(let i=0;i<notCompleteStudent.length;i++){
                                    this.notcompleteData.push({
                                        id:notCompleteStudent[i].compositionId,
                                        name:notCompleteStudent[i].name,
                                        class:notCompleteStudent[i].grade+notCompleteStudent[i].className,
                                        img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg'
                                    })
                                }
                            }
                    }
                    // this.selectText=data[select].gradeClass
                    // for(let i=0;i<data.length;i++){
                    
                    // } 
                })
                }else{
                    let url = this.$store.state.url;
                     this.$http.get(url+'/teacher1/task/taskCompletion',{ 
                    params:{'id': this.$route.query.id } 
                }).then(response =>{
                    console.log(response)
                    let data=response.body.dto[0]
                    let total=data.completeNum+data.notCompleteNum
                    console.log(total)
                    // this.selectText=data[select].gradeClass
                    // for(let i=0;i<data.length;i++){
                    $('#container').highcharts({
                    chart: {
                            type: 'solidgauge',
                            height: 200,
                            backgroundColor:'#384267',
                            borderColor:'#384267',
                            borderRadius:'50px'
                        },
                        title: null,
                        pane: {
                            center: ['50%', '60%'],
                            size: '100%',
                            startAngle: 240,
                            endAngle: 480,
                            background: {
                                innerRadius: '90%',
                                outerRadius: '100%',
                                shape: 'arc',
                                borderWidth: 0
                            }
                        },
                        tooltip: {
                            enabled: false
                        },
                        yAxis: {
                            min: 0,
                            max: total,
                            stops: [
                                [0, '#fe4c76'], 
                                [0.5, '#f5b284'], 
                                [1, '#fe4c76'] 
                            ],
                            lineWidth: 0,
                            minorTickInterval: null,
                            tickPixelInterval: 400,
                            tickWidth: 0,
                            title: {
                                y: -70
                            },
                            labels: {
                                y: 16
                            },
                            tickPositions: [],
                            plotBands: [{
                                from: 0,
                                to: total,
                                thickness: '10%',
                                color: '#6a89f4' // green
                            }]
                        },
                        plotOptions: {
                            solidgauge: {
                                dataLabels: {
                                    y: 5,
                                    borderWidth: 0,
                                    useHTML: true
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: '人数',
                            data: [
                                {
                                    radius: '90%',
                                    innerRadius: '100%',
                                    y:data.completeNum
                                }
                            ],
                            dataLabels: {
                                y:-30,
                                formatter: function () {
                                    return '<span style="color:#fff;width: 100%;display: inline-block;text-align:center;">'+text+' </span><br/>'+'<span style="display:block;width:100%;height:1px;border-bottom:1px solid #fea405"></span>' +
                                        '<span style="color:#fff">总人数：'+total+'</span>';
                                }
                            },
                        }]
                    }); 
                        $('#containerLeft').highcharts({
                            chart: {
                                type: 'solidgauge',
                                backgroundColor:'#384267',
                                borderColor:'#384267',
                                borderRadius:'50px'
                            },
                            title:{
                                text:'已提交人数',
                                align:'center',
                                floating:true,
                                y:80,
                                style: {
                                    color: '#969caf',
                                    fontSize: "12px"
                                }
                            },
                            pane: {
                                startAngle: 0,
                                endAngle: 360,
                                center: ['50%', '30%'],
                                size: '40%',
                                background: [{ // Track for Move
                                    outerRadius: '112%',
                                    innerRadius: '88%',
                                    backgroundColor:'#444566',
                                    borderWidth: 0
                                }]
                            },
                            yAxis: {
                                min: 0,
                                max: total,
                                lineWidth: 0,
                                tickPositions: []
                            },
                            tooltip: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                solidgauge: {
                                    borderWidth: '.2rem',
                                    dataLabels: {
                                        enabled: true
                                    },
                                }
                            },
                            series: [{
                                borderColor: {
                                    linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                    stops: [
                                        [0, '#fe6e8f'],
                                        [0.2, '#fe6e8f'],
                                        [0.4, '#fe6e8f'],
                                        [0.8, '#fe6e8f'],
                                        [1, '#f5b283']
                                    ]
                                },
                                data: [{
                                    color: Highcharts.getOptions().colors[0],
                                    innerRadius: '100%',
                                    y:data.completeNum,
                                    dataLabels: {
                                        borderColor: undefined,
                                        color:'#fff',
                                        borderWidth: 0,
                                        padding: 0,
                                        shadow: false,
                                        y:60,
                                        format: '{y} 人'
                                    }
                                }],
                            }]
                        })
                        $('#containerRight').highcharts({
                            chart: {
                                type: 'solidgauge',
                                backgroundColor:'#384267',
                                borderColor:'#384267',
                                borderRadius:'50px'
                            },
                            title:{
                                text:'未提交人数',
                                align:'center',
                                floating:true,
                                y:80,
                                style: {
                                    color: '#969caf',
                                    fontSize: "12px"
                                }
                            },
                            pane: {
                                startAngle: 0,
                                endAngle: 360,
                                center: ['50%', '30%'],
                                size: '40%',
                                background: [{ // Track for Move
                                    outerRadius: '112%',
                                    innerRadius: '88%',
                                    backgroundColor:'#444566',
                                    borderWidth: 0
                                }]
                            },
                            yAxis: {
                                min: 0,
                                max:total,
                                lineWidth: 0,
                                tickPositions: []
                            },
                            tooltip: {
                                enabled: false
                            },
                            credits: {
                                enabled: false
                            },
                            plotOptions: {
                                solidgauge: {
                                    borderWidth: '.2rem',
                                    dataLabels: {
                                        enabled: true
                                    },
                                }
                            },
                            series: [{
                                borderColor: {
                                    linearGradient: { x1: 0.5, x2: 0, y1: 0, y2: 0.5 },
                                    stops: [
                                        [0, '#6987f5'],
                                        [0.2, '#6987f5'],
                                        [0.4, '#6987f5'],
                                        [0.8, '#6987f5'],
                                        [1, '#92c7e6']
                                    ]
                                },
                                data: [{
                                    color: Highcharts.getOptions().colors[0],
                                    innerRadius: '100%',
                                    y:data.notCompleteNum,
                                    dataLabels: {
                                        borderColor: undefined,
                                        color:'#fff',
                                        borderWidth: 0,
                                        padding: 0,
                                        shadow: false,
                                        y:60,
                                        format: '{y} 人'
                                    }
                                }],
                            }]
                        })
                        this.completeData=[]
                        this.notcompleteData=[]
                        let completeData=data.completeStudent
                            if(completeData.length>0){
                                for(let i=0;i<completeData.length;i++){
                                    let year=new Date(completeData[i].completeTime).getFullYear()
                                    let mon=new Date(completeData[i].completeTime).getMonth()+1
                                    let day=new Date(completeData[i].completeTime).getDate()
                                    let hours=new Date(completeData[i].completeTime).getHours()
                                    let minutes=new Date(completeData[i].completeTime).getMinutes()
                                    let seconds=new Date(completeData[i].completeTime).getSeconds()
                                    let time = year+"-"+mon+"-"+day+" "+hours+":"+minutes+":"+seconds
                                    this.completeData.push({
                                        id:completeData[i].compositionId,
                                        name:completeData[i].name,
                                        class:completeData[i].grade+completeData[i].className,
                                        time:time,
                                        img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg',
                                        state:completeData[i].isComment
                                    })
                                }
                            }
                            let notCompleteStudent=data.notCompleteStudent
                            if(notCompleteStudent.length>0){
                                for(let i=0;i<notCompleteStudent.length;i++){
                                    this.notcompleteData.push({
                                        id:notCompleteStudent[i].compositionId,
                                        name:notCompleteStudent[i].name,
                                        class:notCompleteStudent[i].grade+notCompleteStudent[i].className,
                                        img:'http://img4.imgtn.bdimg.com/it/u=642100783,3922165855&fm=27&gp=0.jpg'
                                    })
                                }
                            }
                    // } 
                })
                }
                this.alertPop=false
            },
            activeNav(n){
                let l=this.completionData.length;
                this.active='tab-container'+ n
                for(let i=1;i<=l;i++){
                    if(i==n){
                        let selectNav='.nav-container'+i
                        $(selectNav).css("background-color","black");
                    }else{
                        let selectNav='.nav-container'+i
                        $(selectNav).css("background-color","white");
                    }
                }
            },
        },
    }
</script>
<style>
    .completion{
        overflow: scroll;
    }
    .item {
    display: inline-block;
  }

  .nav {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 11.5rem;
    width: 100%;
    z-index: 999;

  }
  .nav>button{
          background-color: white;
    width: .2rem;
    height: .2rem;
    border: 1px solid;
    border-radius: 1.5rem;
    margin: 0 0.2rem;
  }
  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }
  .tab-con{
          margin-top: 2rem;
  }
  .tab-con>.mint-navbar{
          margin-top: 1.25rem;
    border-top: 1px solid #e5e5e5;
  }
  .tab-con>.mint-navbar .mint-tab-item{
          border-right: 1px dashed #e5e5e5;
  }
  .tab-con>.mint-navbar .mint-tab-item.is-selected{
          color: #418aff;
          border-bottom: 2px solid #418aff;
  }
  .tab-con>.mint-tab-container{
          margin-top: 0.08rem;
      border-top: 1px solid #e5e5e5;
  }
  .complete-box{
          width: 100%;
    height: 2rem;
          border-bottom: 1px solid #e5e5e5;
  }
  .complete-left{
      float:left;
      width: 1.8rem;
    height: 1.8rem;
    border-radius: 4.5rem;
    overflow: hidden;
    margin: .1rem .6rem;
  }
  .complete-left-img{
      width: 1.8rem;
    height: 1.8rem;
  }
  .complete-con{
      float:left;
  }
  .complete-right{
      float:right;
  }
  .complete-right-img{
          width: .8rem;
    height: .8rem;
    margin-top: .6rem;
    margin-right: .6rem;
  }
  .complete-con-top{
      font-size: .4rem;
    color: #27222c;
    margin-top: .4rem;
  }
  .complete-class{
       color: #9d9d9d;
        margin-left: .3rem;
  }
  .complete-con-bom{
          margin-top: .2rem;
    color: #fec154;
  }
    .completion-header{
		background-color: #fff;
		height:1.5rem;
        color:#151515;
        font-size: 0.6rem;
	}
    .container{
        width:100%;
        
    }
    .containerLeft{
        width:50%;
        height:3.5rem;
        float:left;
    }
    .containerRight{
        width:50%;
        height:3.5rem;
        float:right;
    }
    .tab-top{
        height:10rem;
    width: 8rem;
    margin-left: 1rem;
    background: #384267;
    border-radius: .2rem;
        box-shadow: 0 2px 25px 8px #ccc;
        margin-top: .5rem;
        margin-bottom: .5rem;
    }
    .notcompleteData-p{
        line-height: 1rem;
    font-size: .4rem;
    }
    .notcompleteData-con{
        height: 100%;
    }
    .mint-popup{
            width: 85%;
    border-radius: 0.4rem;
      }
	  .list{
		width: 100%;
    height: 1.25rem;
    text-align: center;
    line-height: 1.25rem;
    font-size: 0.5rem;
    border-bottom: 1px solid #ccc;

	  }
      .list:last-child{
          border-bottom:0;
      }
      .selectText{
          font-size:.3rem!important;
      }
</style>   