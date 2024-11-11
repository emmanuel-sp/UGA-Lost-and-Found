import Item from './ItemCard';



// I (Amir) created this to test my code with to add data but if seems it is already created in the items page.


type ItemType = {
    id: number;
    name: string;
    dateFound: string;
    imageUrl?: string;
    status: 'Claimed' | 'Unclaimed';
    locationFound: string;
};

type ItemProps = {
    items: ItemType[];
};

const Items = ({items}: ItemProps) => {
    return (
        <div>
        {items.map((item) => (
            <Item
            //id={item.id}
            name={item.name}
            dateFound={item.dateFound}
            locationFound={item.locationFound}
            imageUrl={item.imageUrl}
            status={item.status}
            />
        ))}
        </div>
    );
};

export default Items;