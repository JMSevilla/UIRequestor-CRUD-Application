<template>
    <div id="index">
        <nav-bar />
       <div class="container mt-3">
          
           <tables class="mt-3"/>
       </div>


       
    </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import navbar from '@/components/navbar/navbar';
import tables from '@/components/table/tables';
export default {
    name: "index",
    components: {
        'nav-bar':navbar,
        tables
    },
    
    
}
</script>