import ArrowButton from '../../components/ArrowButton/index';
import Block from '../../modules/Block/Block';
export declare class Profile extends Block {
    componentDidMount(): void;
}
export declare const profileProps: {
    components: {
        arrowBtn: ArrowButton;
    };
    events: {
        type: string;
        element: string;
        callback(event: Event): void;
    }[];
};
