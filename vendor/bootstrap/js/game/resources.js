resources = [
    new Resource("workers",
        "Workers",
        "The hard working citizens that build your empire. Required for almost everything.",
        0,
        0),
    new Resource("materials",
        "Materials",
        "The hard working citizens that build your empire. Required for almost everything.",
        0,
        0),
    new Resource("research",
        "Research",
        "The hard working citizens that build your empire. Required for almost everything.",
        0,
        0)
];

function Resource(id, name, description, amount, production) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.amount = amount;
    this.production = production;
}