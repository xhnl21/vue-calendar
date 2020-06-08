    $(function () {
        $('#start').datetimepicker({                
          format: 'DD/MM/YYYY',             
        });
        $('#starttime').datetimepicker({                
          format: 'HH:mm',             
        });
        $('#end').datetimepicker({                
          format: 'DD/MM/YYYY',             
        });
        $('#endtime').datetimepicker({                
          format: 'HH:mm',             
        });   

        $('#starts1').datetimepicker({                
          format: 'DD/MM/YYYY',             
        });
        $('#starttimes1').datetimepicker({                
          format: 'HH:mm',             
        });
        $('#end1s').datetimepicker({                
          format: 'DD/MM/YYYY',             
        });
        $('#endtimes1').datetimepicker({                
          format: 'HH:mm',             
        });                                                   
    });
    
    const data = [];
    new Vue({
      components: { 'vue-cal': vuecal },
      el: '#app',
      data: () => ({
        selectedEvent: {},
        events: data,
        eventsCssClasses: ['leisure', 'sport', 'health']
      }),     
      methods: {
        getInit: function(event, e){
            axios.get('json.txt')
            .then(function (response) {
              dat = response.data.data;
              for (var i = 0; i < dat.length; i++) {
                  data.push({
                    title: dat[i].title,
                    start: dat[i].start,
                    end: dat[i].end,
                    content: dat[i].content,
                    contentFull: dat[i].contentFull,
                    class: dat[i].class,
                  })               
              }          
            })
            .catch(function (error) {
                console.log(error);
            });    
        },
        onEventClick (event, e) {
          this.selectedEvent = event;
          $('#myModal').modal('show');
          $('#start').val(this.selectedEvent.start.format('DD/MM/YYYY'));
          $('#end').val(this.selectedEvent.end.format('DD/MM/YYYY'));
          $('#starttime').val(this.selectedEvent.start.formatTime());
          $('#endtime').val(this.selectedEvent.end.formatTime());
          $('#title').val(this.selectedEvent.title);
          $('#content').val(this.selectedEvent.content);
          $('#contentfull').val(this.selectedEvent.contentFull);
          $('#class').val(this.selectedEvent.class);
          // Prevent navigating to narrower view (default vue-cal behavior).
          e.stopPropagation();
        },

        editPr: function(){
          $('#form').show();
          $('#btn').show();
          $('#title-vue').show();
          $('#form2').hide();
          $('#btn2').hide();  
          $('#title-vue2').hide();   
        },

        editsPr: function(){
          $('#myModal').modal('hide');
          $('#myModal2').modal('show');  
        },

        addPr: function(){
          $('#myModal3').modal('show');  
        },        

        close: function(){
          $('#form').hide();
          $('#btn').hide();
          $('#title-vue').hide();
          $('#form2').show();
          $('#btn2').show();  
          $('#title-vue2').show();   
          $('#start').val("");
          $('#end').val("");
          $('#starttime').val("");
          $('#endtime').val("");
          $('#title').val("");
          $('#content').val("");
          $('#contentfull').val("");
          $('#class').val("");
          $('#myModal').modal('hide');
        },

        closet: function(){  
          $('#starts1').val("");
          $('#ends1').val("");
          $('#starttimes1').val("");
          $('#endtimes').val("");
          $('#titles').val("");
          $('#contents').val("");
          $('#contentfulls').val("");
          $('#classs').val("");
          $('#myModal3').modal('hide');
        },                  
      },
      created: function(){
        this.getInit();
      },
    })