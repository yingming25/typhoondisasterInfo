
<template>
  <div class="hello">
    <select class="custom-select" v-model="selected" @change="onChange">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <span>Selected: {{ selected }}</span>
    <table id="table" class="table">
        <thead>
          <tr>
              <th>#</th>
              <th>發生日期:</th>
              <th>發生地區:</th>
              <th>發生地點:</th>
              <th>事件狀況:</th>
              <th>事件描述:</th>
              <th>災情種類:</th>
              <th>聯絡單位:</th>
              <th>案件處理狀況:</th>

          </tr>
        </thead>
        <tbody>
            <tr v-for="(r, index) in rows.slice(pageStart, pageStart + countOfPage)">
              <td>{{ (currPage-1) * countOfPage + index + 1 }}</td>
              <td>{{ r.DPName }}</td>
              <td>{{ r.CaseLocationDistrict }}</td>
              <td>{{ r.CaseLocationDescription }}</td>
              <td>{{ r.Name }}</td>
              <td>{{ r.CaseDescription }}</td>
              <td>{{ r.PName }}</td>
              <td>{{ r.CaseCommunicatorUnit }}</td>
              <td>{{ r.CaseComplete }}</td>
            </tr>
        </tbody>
    </table>
    <div class="pagination">
      <ul>
        <li v-bind:class="{'disabled': (currPage === 1)}"
            @click.prevent="setPage(currPage-1)"><a href="#">Prev</a></li>
        <li v-for="n in totalPage"
            v-bind:class="{'active': (currPage === (n))}"
            @click.prevent="setPage(n)"><a href="#">{{n}}</a></li>
        <li v-bind:class="{'disabled': (currPage === totalPage)}"
            @click.prevent="setPage(currPage+1)"><a href="#">Next</a></li>
      </ul>
    </div>




  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      rows: [],
      page: false,
      countOfPage: 50,
      currPage: 1,
      selected: 'A',
      firstInit: true,
      options: [
        { text: '--請選擇地區--', value: 'A' },
        { text: '中正區', value: '中正區' },
        { text: '大同區', value: '大同區' },
        { text: '中山區', value: '中山區' },
        { text: '松山區', value: '松山區' },
        { text: '大安區', value: '大安區' },
        { text: '萬華區', value: '萬華區' },
        { text: '信義區', value: '信義區' },
        { text: '士林區', value: '士林區' },
        { text: '北投區', value: '北投區' },
        { text: '內湖區', value: '內湖區' },
        { text: '南港區', value: '南港區' },
        { text: '文山區', value: '文山區' },
      ]
    }
  },
  computed: {
    /*filteredRows: function(){
    var filter_name = this.filter_name;

    // 如果 filter_name 有內容，回傳過濾後的資料，否則將原本的 rows 回傳。
    return ( this.filter_name.trim() !== '' ) ?
      this.rows.filter(function(d){ return d.CaseLocationDistrict.indexOf(filter_name) > -1;}) :
      this.rows;
    },*/
    pageStart: function(){
        return (this.currPage - 1) * this.countOfPage;
      },
    totalPage: function(){
      return Math.ceil(this.rows.length / this.countOfPage);
    }
  },
  methods: {
    getAjax: function() {
      // GET /someUrl
      this.$http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json').then(response => {

      // get body data
      this.someData = response.body;
      let data = this.someData.DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
      //console.log(data);

      let Len = data.length;
      for(let i = 0; i < Len; i++) {
        if(this.firstInit) {
          if(data[i].CaseComplete == 'true') {
            data[i].CaseComplete = '已處理';
            this.rows.push(data[i]);
          }else {
            data[i].CaseComplete = '未處理';
            this.rows.push(data[i]);
          }
        }
        if( data[i].CaseLocationDistrict == this.selected ){
          if(data[i].CaseComplete == 'true') {
            data[i].CaseComplete = '已處理';
            this.rows.push(data[i]);
          }else {
            data[i].CaseComplete = '未處理';
            this.rows.push(data[i]);
          }
        }

      }
      //console.log(this.rows);
      }, response => {
      // error callback

      });
    },
     setPage: function(idx){
      if( idx <= 0 || idx > this.totalPage ){
        return;
      }
      this.currPage = idx;
    },
    onChange: function() {
      console.log(this.selected);
      this.rows=[];
      this.firstInit = false;
      this.getAjax();
    }
  },
  mounted () {
    console.log(this.selected);
    this.getAjax();

  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
#table {
  margin-top: 50px;
}

#table th, #table td {
  width: 200px;
}

</style>
