export class Pack {
	
	//ref_pack: number;
	transporter_name: string;
	status: string;
	userid: string;
	pack_date: string;
	formater_date: string;

    constructor(private ref_pack: number,
				transporter_name: string,
				status: string,
				userid: string,
				pack_date: string,
				formater_date: string) {}
    
};
