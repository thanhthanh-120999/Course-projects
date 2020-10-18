
$(document).ready(function () {
    var currentGarden = [
        {
            id: 1,
            personName: "Aurelia Vega",
            location: "Spain"
        },
        {
            id: 2,
            personName: "Guerra Cortez",
            location: "USA"
        },
        {
            id: 3,
            personName: "Guadalupe House",
            location: "Germany"
        },
        {
            id: 4,
            personName: "Elisa Gallagher",
            location: "United Kingdom"
        }
    ];
    var basicStructure = `
        <table id="avaiableGardens-table" class="table table-bordered table-responsive-md table-striped text-center">
        <tr>
          <th class="text-center" style="width: 70px;">Number</th>
          <th class="text-center" style="width: 400px;">Person Name</th>
         
          <th class="text-center" style="width: 100px;">Status</th>
          <th class="text-center" style="width: 500px;">Location</th>
          <th class="text-center">Switch</th>
          <!--<th class="text-center">Sort</th>-->
          <th class="text-center">Remove</th>
        </tr>`;

    function removeGarden(id) {
        swal({
            title: "Are you sure?",
            text: "The garden will be delete. You can't restore it after deleting",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    for (var i = 0; i < currentGarden.length; i++) {
                        if (currentGarden[i].id == id) {
                            // alert("hello");
                            while (i < currentGarden.length) {
                                currentGarden[i].id = currentGarden[i].id - 1;
                                currentGarden[i] = currentGarden[i + 1];

                                i++
                            }
                            currentGarden.length = currentGarden.length - 1;
                            renderLayoutAvailableGarden(currentGarden)
                        }
                    }
                    swal("Poof! Your garden has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your garden file is safe!");
                }
            });
    }

    function addNewGarden() {
        $('#dataForm').remove();
        var dataForm = `
        <div id="dataForm">        
        <div class="card" style="width: 50%;">
            <div class="text">New Garden Information</div>
            <div class="card-body">
                <label class="sr-only" for="inlineFormInputGroup"></label>
                <div class="input-group mb-2">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Garden Name</div>
                  </div>
                  <input type="text" class="form-control py-0" id="gardenName" placeholder="Name">
                </div>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                      <div class="input-group-text">Location</div>
                    </div>
                    <input type="text" class="form-control py-0" id="locationGarden" placeholder="Location">
                  </div>
                  <div id="map-container-google-2" class="z-depth-1-half map-container"
                                    style="width: 100%;">
                                    <iframe
                                        src="https://maps.google.com/maps?q=chicago&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        frameborder="0" style="border:0" allowfullscreen></iframe>
                                </div>
                  <span>
                    <button class="btn btn-primary" id="close">Close</button>
                    <button class="btn btn-primary" id="add">Add & Save</button>
                  </span>
                  
            </div>
          </div>
       </div>`;
       $('body').append(dataForm);

       $('#close').click(function(e){
        $('#dataForm').remove();
       })

       $('#add').click(function(e){
           var addGardenItem = {};
           addGardenItem.id = currentGarden.length + 1;
           addGardenItem.personName = $('#gardenName').val();
           addGardenItem.location = $('#locationGarden').val();
            currentGarden.push(addGardenItem);
            renderLayoutAvailableGarden(currentGarden);

        $('#dataForm').remove();
       })

    }



    if (currentGarden.length == 0) {
        $('#table').append('No Gardens available in this time!')
    }
    else {
        renderLayoutAvailableGarden(currentGarden)
    }



    function renderLayoutAvailableGarden(currentGarden) {
        $('#avaiableGardens-table').remove();
        $('#table').append(basicStructure);
        for (var i = 0; i < currentGarden.length; i++) {
            var currentItem = `
                  <tr>
                  <td class="pt-3-half" contenteditable="true">` + currentGarden[i].id + `</td>
                  <td class="pt-3-half" contenteditable="true">` + currentGarden[i].personName + `</td>
                  
                  <td class="pt-3-half" contenteditable="true"><i class="fas fa-wifi" style="color: green;"></i></td>
                  <td class="pt-3-half" contenteditable="true">` + currentGarden[i].location + `</td>
                  <td class="pt-3-half" contenteditable="true"><div class="custom-control custom-switch">
                    <input type="checkbox" class="custom-control-input" id="customSwitch`+ currentGarden[i].id + `" checked>
                    <label class="custom-control-label" for="customSwitch`+ currentGarden[i].id + `"></label>
                  </div></td>
                  <td>
                    <span class="table-remove"><button type="button"
                        class="btn btn-danger btn-rounded btn-sm my-0" id="removeGardenItem" value="` + currentGarden[i].id + `">Remove</button></span>
                  </td>
                </tr>`;
            $('#avaiableGardens-table').append(currentItem);

            currentItem = '';

            $('button#removeGardenItem').click(function () {
                removeGarden($(this).attr("value"));
            });
        }

    }
    
    $('#add-item').click(function () {
        addNewGarden()
    });



});