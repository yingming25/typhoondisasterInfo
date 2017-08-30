
<template>
  <div class="child">
    <header>
      <slot name="header">Default Header</slot>
    </header>
    <hr>

    <main>
      <slot>Default Body</slot>
    </main>

    <hr>
    <footer>
      <slot name="footer">Default Footer</slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'child',


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
