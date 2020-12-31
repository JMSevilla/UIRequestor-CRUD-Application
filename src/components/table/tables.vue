<template>
    <div id="tables">
         <button class="btn btn-primary" @click="onAdd()">Add</button>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Firstname</th>
      <th scope="col">Lastname</th>
      <th scope="col">Email</th>
      <th scope="col">Comment</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in items" :key="item.id">
      <th scope="row">{{item.id}}</th>
      <td>{{item.firstname}}</td>
      <td>{{item.lastname}}</td>
      <td>{{item.email}}</td>
      <td>{{item.comment}}</td>
      <td>
          <button class="btn btn-primary" @click="onUpdate(item.id, item.firstname, item.lastname, item.email, item.comment)">Update</button>&nbsp;
          <button class="btn btn-danger" @click="onDel(item.id)">Delete</button>
      </td>
    </tr>
    
  </tbody>
</table>

<b-modal id="bv-modal-example1" hide-footer>
    <template #modal-title>
      {{modal_title}}
    </template>
    <h3>Are you sure you want to delete?</h3>
    <b-button class="mt-3 btn btn-primary" block @click="onConfirmDelete()">Confirm</b-button>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
  </b-modal>

<b-modal id="bv-modal-example" hide-footer>
    <template #modal-title>
      {{modal_title}}
    </template>
    
    <div class="d-block text-center">
        <div class="mb-3" v-if="mode == true">
        </div>
        <div class="mb-3" v-else>
            Stored Procedure : <input v-model="data_style_mode" type="checkbox" id="blankCheckbox" aria-label="..." @change="onCheck">
        </div>
        <div class="mb-3">
        <label for="fname" class="form-label">Firstname</label>
        <input type="text" v-model="task.firstname" class="form-control" id="fname" placeholder="Ex: John Doe">
        </div>
        <div class="mb-3">
        <label for="lname" class="form-label">Lastname</label>
        <input type="text" v-model="task.lastname" class="form-control" id="lname" placeholder="Ex: Doe">
        </div>
     <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Email address</label>
        <input type="email" v-model="task.email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
        <label for="comment" class="form-label">Comment</label>
        <textarea v-model="task.comment" class="form-control" id="comment" rows="3"></textarea>
        </div>
    </div>
    <div v-if="mode == true">
        <b-button class="btn btn-primary mt-3" block @click="onUpdateQuery()">Update</b-button>
    </div>
    <div v-else>
<b-button class="btn btn-primary mt-3" block @click="onSave()">Save</b-button>
    </div>
    <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
  </b-modal>
    </div>
</template>

<script>
import {READ,CREATE,CREATE_SPROC, UPDATE_SPROC, DELETE} from '@/store/Request/AllRequest';
export default {
    name : 'tables',
    data: () => ({
        items: [],
        task: {
           firstname : "",
           lastname : "",
           email : "",
           comment : ""
       },
       u_id: "",
       mode: false,
       data_style_mode: false,
       modal_title: ""
    }),
    created(){
        this.Read_Data();
    },
    methods: {
        onConfirmDelete: function(){
            DELETE(this.u_id).then(() => {
                alert("Success Delete");
                this.Read_Data();
                this.$bvModal.hide("bv-modal-example1");
                
            });
        },
        onDel : function(id){
            this.u_id = id;
            this.modal_title = "Delete Data"
            this.$bvModal.show("bv-modal-example1");
        },
        onAdd: function(){
            this.modal_title = "Create Data";
            this.onClear();
            this.$bvModal.show("bv-modal-example");
        },
        onUpdate: function(id, firstname, lastname, email, comment){
            this.modal_title = "Update Data";
            this.task.firstname = firstname;
            this.task.lastname = lastname;
            this.task.email = email;
            this.task.comment = comment;
            this.u_id = id;
            this.mode = true;
            this.$bvModal.show("bv-modal-example");
        },
        onCheck(){
            this.data_style_mode = true;
        },
        Read_Data :function(){
            READ()
            .then(response => {
                this.items = response.data;
            });
        },
        onClear(){
            this.task.firstname = "";
            this.task.lastname = "";
            this.task.email = "";
            this.task.comment = "";
           
        },
        onUpdateQuery: function(){
            UPDATE_SPROC(this.task, this.u_id)
            .then(() => {
                alert("Success Update");
                this.Read_Data();
                this.onClear();
                this.$bvModal.hide("bv-modal-example");
            });
        },
         onSave : function(){
         
              if(this.data_style_mode == true)
          {
              
              CREATE_SPROC(this.task)
              .then(() => {
                  alert("Success Created Stored Procedure");
                  this.Read_Data();
                  this.$bvModal.hide("bv-modal-example");
                    this.onClear();
                    this.data_style_mode = false;
              })
          }
          else{
            
            CREATE(this.task).then(response => {
        console.log(response.data);
        alert("Success Created!");
        this.Read_Data();
        this.$bvModal.hide("bv-modal-example");
        this.onClear();
    });
          }
          
        }
    }
}
</script>