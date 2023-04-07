import React from "react";

import Table from "./Table";

function TableCard({ table }) {
    return (
        <div className="row mb-4">
            <div className="col col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <Table
                                renderHeader={table.renderHeader}
                                renderItems={table.renderItems}
                                renderFooter={table?.renderFooter}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TableCard;
