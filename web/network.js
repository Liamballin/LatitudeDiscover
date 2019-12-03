var network;
	var nodes;
	var edges;
	var newRoot;

	var idList = [];

	function idInData(id){
		// var d = network.DataSet.get();
		// console.log(d);
		var found = false;
		for(i = 0; i < idList.length;i++){
			if(id === idList[i]){
				console.log("Found in dataaset")
				found = true;
			}
		}
		console.log("Not found; return false")
		return found;
	}

	function renderNew(data){
		var parse = []
		var edg = []
		for(i = 0; i < data.length;i++){




			if(!idList.includes(data[i].id)){
				console.log(data[i])
				var newOb = {};
				newOb.id = data[i].id;
				idList.push(data[i].id)
				var genre;
				if(data[i].genres[0] != undefined){
					genre = data[i].genres[0]
				}else{
					genre="";
				}
				newOb.label = data[i].name+"\n"+genre;
				
					newOb.group = genre;
				
				if(data[i].images[0] != undefined){
					newOb.image = data[i].images[0].url;
				}else{
					newOb.image ="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyG1pllAcOZLO2j7zgS9IceYndTwS-BKpi7Gwam95nowy_a7sl"
				}
				newOb.shape = "circularImage"
				parse.push(newOb)
			}else{
				console.log("Already added!")
			}
			var link = {from:newRoot, to: data[i].id}
			edg.push(link)
		}
		// parse.push({id:0, label:"ROOT"})

		nodes.update(parse);
		edges.update(edg)

	}

	function render(data){
		var parse = []
		var edg = []
		for(i = 0; i < data.length;i++){
			var newOb = {};
			var newOb = {};
			newOb.id = data[i].id;
			idList.push(data[i].id)
			var genre;
			if(data[i].genres[0] != undefined){
				genre = data[i].genres[0]
			}else{
				genre="";
			}
			newOb.label = data[i].name+"\n"+genre;
			newOb.exploded = false;
			if(data[i].images[0] != undefined){
				newOb.image = data[i].images[0].url;
			}else{
				newOb.image ="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRyG1pllAcOZLO2j7zgS9IceYndTwS-BKpi7Gwam95nowy_a7sl"
			}
			newOb.shape = "circularImage"
			parse.push(newOb)

			var link = {from:0, to: data[i].id}
			edg.push(link)
		}
		parse.push(rootArtist);

		nodes = new vis.DataSet(parse);
		edges = new vis.DataSet(edg);
	  

	  
		var container = document.getElementById("mynetwork");
		var data = {
		  nodes: nodes,
		  edges: edges
		};
		var options = {
            clickToUse:false,
			nodes: {
                borderWidth:5,
                font:{
                    color:"#FFFFFF",
                    face:"Nunito",
                    align:"left",
                    multi:true
                }
            },
 
			layout: {
				improvedLayout: false
            }
  
		}
		
		network = new vis.Network(container, data, options);

		network.on( 'click', function(properties) {
		var ids = properties.nodes;
		var clickedNodes = nodes.get(ids);
        if(clickedNodes.length > 0 && clickedNodes[0].id != 0){
            loadPreview(clickedNodes[0].id)
            if(!clickedNodes[0].exploded){
                newRoot = clickedNodes[0].id;
                explodeNode(clickedNodes[0].id)
                // clickedNodes[0].exploded = true;
                nodes.update({id: clickedNodes[0].id, exploded: true});

            }else{
                // console.log("Already exploded")
                getInfoPaneData(clickedNodes[0].id)
            }
        }

		});
	}