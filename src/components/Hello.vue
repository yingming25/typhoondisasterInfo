<template>
  <div class="hello">
    <table class="table" id="table">
    </table>

  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods: {
    getAjax () {
      // GET /someUrl
      this.$http.get('https://tcgbusfs.blob.core.windows.net/blobfs/GetDisasterSummary.json').then(response => {
      //console.log(response);
      // get body data
      //this.someData = response.body;
      let content = [];
      content.push(response.body);
      let data = content[0].DataSet['diffgr:diffgram'].NewDataSet.CASE_SUMMARY;
      let table = document.querySelector('.table');
      let str = '';
      let Len = data.length;

      str += `
        <thead>
          <tr>
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
      `;


      for (let i = 0; i < Len; i++) {
        if( data[i].CaseComplete == "true" ) {
            data[i].CaseComplete = "已處理";
            str +=`
              <tr>
                <td>${ data[i].DPName }</td>
                <td>${ data[i].CaseLocationDistrict }</td>
                <td>${ data[i].CaseLocationDescription }</td>
                <td>${ data[i].Name }</td>
                <td>${ data[i].CaseDescription }</td>
                <td>${ data[i].PName }</td>
                <td>${ data[i].CaseCommunicatorUnit }</td>
                <td>${ data[i].CaseComplete }</td>
              </tr>
            `;
        }else {
            data[i].CaseComplete = "待處理";
            str +=`
              <tr>
                <td>${ data[i].DPName }</td>
                <td>${ data[i].CaseLocationDistrict }</td>
                <td>${ data[i].CaseLocationDescription }</td>
                <td>${ data[i].Name }</td>
                <td>${ data[i].CaseDescription }</td>
                <td>${ data[i].PName }</td>
                <td>${ data[i].CaseCommunicatorUnit }</td>
                <td>${ data[i].CaseComplete }</td>
              </tr>
            `;
        }


      }
      table.innerHTML = str;


      }).catch(function(e) {
        console.log(e);
      });
    },

  },
    mounted () {
      this.getAjax();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
