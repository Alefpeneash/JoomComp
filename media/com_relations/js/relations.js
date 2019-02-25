function diagram(data){

    let $ = go.GraphObject.make;
    let myDiagram =
    $(go.Diagram, "myDiagramDiv",
        {
        "undoManager.isEnabled": true 
        });

    let myModel = $(go.Model);
    let users = data;

    myDiagram.nodeTemplate = 
    $(go.Node, "Auto",
    new go.Binding("location", "loc", go.Point.parse),
    new go.Binding("visible", "visible"),
    $(go.Shape, "RoundedRectangle", { fill: "lightgray" }),
    $(go.Panel, "Table",
        $(go.TextBlock, {row: 0, column: 0, visible: false},
            new go.Binding("text", "key")),
        $(go.TextBlock, 'Firstname: ', {row: 0, column: 0, margin: 2}),
        $(go.TextBlock, {row: 0, column: 2, margin: 2},
            new go.Binding("text", "firstname")),
        $(go.TextBlock, 'Lastname: ', {row: 1, column: 0, margin: 2}),
        $(go.TextBlock, {row: 1, column: 2, margin: 2},
            new go.Binding("text", "lastname")),
        $(go.TextBlock, 'Group: ', {row: 2, column: 0, margin: 2}), 
        $(go.TextBlock, {row: 2, column: 2, margin: 2},
            new go.Binding("text", "group"))
    )
    );

    

    myDiagram.contextMenu = 
    $("ContextMenu",
        $("ContextMenuButton",
        $(go.TextBlock, "Show all nodes"),
        { click: function(e, obj) {
            userm.forEach(function(v, k, m) {
                v.visible = true;
                myDiagram.findNodeForKey(k).visible = true;
            })
        } })
    );
    
    myDiagram.nodeTemplate.contextMenu =
    $("ContextMenu",
      $("ContextMenuButton",
        $(go.TextBlock, "Show links from"),
        { click: function(e, obj) {
            let itr = myDiagram.links;
            userm.forEach(function(v, k, m) {
                
                v.visible = false;

                itr.each(function(d){
                    if ((d.fromNode.key == obj.part.data.key && d.toNode.key == k) || (k == obj.part.data.key)){
                        v.visible = true;
                        return true;
                    }
                });

                if(v.visible != true){
                    myDiagram.findNodeForKey(k).visible = false;
                }
            });
         } }),
        

        $("ContextMenuButton",
        $(go.TextBlock, "Show links to"),
        { click: function(e, obj) {
            let itr = myDiagram.links;
            userm.forEach(function(v, k, m) {
                
                v.visible = false;

                itr.each(function(d){
                    if ((d.toNode.key == obj.part.data.key && d.fromNode.key == k) || (k == obj.part.data.key)){
                        v.visible = true;
                        return true;
                    }
                });

                if(v.visible != true){
                    myDiagram.findNodeForKey(k).visible = false;
                }
            });
         } }),

         $("ContextMenuButton",
         $(go.TextBlock, "Show links to & from"),
         { click: function(e, obj) {
             let itr = myDiagram.links;
             userm.forEach(function(v, k, m) {
                 
                 v.visible = false;
 
                 itr.each(function(d){
                     if ((d.fromNode.key == obj.part.data.key && d.toNode.key == k) || (d.toNode.key == obj.part.data.key && d.fromNode.key == k) || (k == obj.part.data.key)){
                         v.visible = true;
                         return true;
                     }
                 });
 
                 if(v.visible != true){
                     myDiagram.findNodeForKey(k).visible = false;
                 }
             });
          } })
    );
    
    myDiagram.linkTemplate = 
        $(go.Link,
    { routing: go.Link.AvoidsNodes,
        corner: 10 },                
    $(go.Shape),
    $(go.Shape, { toArrow: "Standard" })
    );


    const USERGROUP_STAFF = 10;
    const USERGROUP_PARENTS = 11;
    const USERGROUP_CHILD = 13;
    let mod = [];
    let lda = [];
    let userm = new Map();


    users.forEach(function(user) {
        let rel = {};

        if(typeof userm.get(user.referenceid) == 'undefined'){
            rel['firstname'] = user.firstname;
            rel['lastname'] = user.lastname;
            if (user.group_id == USERGROUP_STAFF){
                rel['group_type'] = 'staff'
            }else{
                rel['group_type'] = (user.group_id == USERGROUP_PARENTS) ? 'parrent':'child';
            }
            if(user.memberid == user.reason)
            {
                rel[1] = user.memberid;
                rel['amount'] = 1;
            }
            userm.set(user.referenceid, rel);
        }else {
            if(user.memberid == user.reason){
                rel = userm.get(user.referenceid);
                if(typeof rel['amount'] == 'undefined'){
                    rel[1] = user.memberid;
                    rel['amount'] = 1;
                }
                else{
                    rel[rel['amount'] + 1]=user.memberid;
                    rel['amount'] = rel['amount'] + 1;
                    userm.set(user.referenceid, rel);
                }
            }
        }

    });

    
    let str;
    let j = 0;
    userm.forEach(function(v, k, m) {

        mod.push({key: k, firstname: v.firstname, lastname: v.lastname, group: v.group_type});   
        let i = 1
        while(typeof v[i] != 'undefined'){
            if(typeof userm.get(v[i]) != 'undefined'){
                lda.push({from: v[i], to: k});
                i++;
            }
        }
    });


    let linkDataArray = lda;

    myModel.nodeDataArray = mod;

    myDiagram.model = new go.GraphLinksModel(mod, linkDataArray);
}