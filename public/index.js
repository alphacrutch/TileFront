const estimate = () => {
    let height = document.querySelector('#height').value;
    let length = document.querySelector('#length').value;
    let width = document.querySelector('#width').value;
    let faces = document.querySelector('#faces').value;


    const self = {
            getWallArea: () => {
                let wallArea = height * width;
                let area = wallArea * faces;
                let totalArea = inchToFeet(area);
                return totalArea;
            },
            getFloorArea: () => {
                let area = length * width;
                let totalArea = inchToFeet(area);
                return totalArea;
            },
            getTotalBathroomArea: () => {
                let wallarea = self.getWallArea();
                let floorarea = self.getFloorArea();
                let area = wallarea * floorarea;
                let totalArea = inchToFeet(area);
                return totalArea;
            },
            getBathroomCost: () => {
                const price = 9;
                let area = self.getTotalBathroomArea();
                let cost = area * price;
                return cost;
            },
            getToiletCost: () => {
                const price = 8;
                let area = self.getTotalBathroomArea();
                let cost = area * price;
                return cost;
            },
            getIndoorFloorCost: () => {
                const price = 8;
                let area = self.getFloorArea();
                let cost = area * price;
                return cost;
            },
            getOutDoorFloorCost: () => {
                const price = 12;
                let area = self.getFloorArea();
                let cost = area * price;
                return cost;
            },
            getBathAndToiletCost: () => {
                let toiletCost = self.getToiletCost();
                let bathCost = self.getBathroomCost();
                let cost = toiletCost + bathCost;
                return cost;
            },
        } //end of self
    return {
        BathAndToiletCost: self.getBathAndToiletCost(),
        OutDoorFloorCost: self.getOutDoorFloorCost(),
        IndoorFloorCost: self.getIndoorFloorCost(),
        ToiletCost: self.getToiletCost(),
        BathroomCost: self.getBathroomCost()
    };
}
const INPUT_TEMPLATE = {
    //Exression Declaration for rendering dimensions inputs
    Floor: ` <label for ="length"> Length </label>
    <input type="number" id="length">
    <label for ="width" > Width </label>
    <input type ="number" id="width"> 
    `,
    //Exresion for the bathroomm declaration
    Bathroom: `
                <div>
                <h4> Bathroom Floor Dimensions </h4>
                <div>
                <label for="length" > Length </label>
                <input type="number" id="length">
                </div>
                <div>
                <label for ="width" > Width </label>
                <input type="number" id="width">
                </div>
                </div>
                <div>
                <h4>Bathroom Wall Dimensions</h4>
                <div>
                <label for="height"> Height</label>
                <input type="number" id="height"> 
                </div>
                <div>
                <label for="width" >Width</label>
                <input type="number" id="height">
                </div>
                <div>
                <label for= "faces"> No. of Walls</label>
                <input type="number" id="faces"
                </div>  `,
}

function inchToFeet(inches) {
    const inchesPerSqFoot = 144;
    let sqft = inches / inchesPerSqFoot;
    return sqft;
}


function FloorProject(name) {

    this.name = name;
    this.type = "Floor";
    this.projectInfo = {
        name: "",
        length: "",

    }
}

function BathroomProject(name) {
    this.name = name;
    this.type = "Bathroom";
}

function ProjectFactory() {
    this.create = (name, type) => {
        switch (type) {
            case 1:
                FloorProject(name);
                break;

            case 2:
                return new BathroomProject(name);
                break;
        }
    }
}

function say() {
    console.log("Project Type:  " + this.type + ". Project Owner: " + this.name)
}


const projectFactory = new ProjectFactory();
const projects = [];
projects.push(projectFactory.create("Patrick", 1));
projects.push(projectFactory.create("James", 2));
projects.forEach(emp => {
    say.call(emp)
})

function getRadioBn() {
    let result = document.querySelector("#results");
    let radiobtns = document.querySelectorAll('.projClass');
    radiobtns.forEach(button => {
        if (button.checked) {
            switch (button.id) {
                case "indoorFloor":
                    console.log("indoor")
                    result.innerText = "$" + estimate().IndoorFloorCost;
                    break;

                case "outDoorFloor":
                    console.log(button.id)
                    result.innerText = "$" + estimate().OutDoorFloorCost;
                    break;

                case "Bathroom":
                    console.log(button.id)
                    result.innerText = "$" + estimate().BathroomCost;
                    break;

                case "toilet":
                    console.log(button.id)
                    result.innerText = "$" + estimate().ToiletCost;
                    break;

                case "bathroomToilet":
                    console.log(button.id)
                    result.innerText = "$" + estimate().BathAndToiletCost;
                    break;

            }
        }

    })
}



const costBtn = document.querySelector('#costBtn');
const form = document.querySelector('#projForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    getRadioBn();
})