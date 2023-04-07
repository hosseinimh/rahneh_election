import React from "react";
import { useSelector } from "react-redux";

import { general } from "../../../constants/strings";
import utils from "../../../utils/Utils";

const TableFooter = ({ columnsCount, pageUtils }) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);

    if (layoutState?.loading) {
        return;
    }

    let pagesCount = Math.ceil(pageState?.props?.itemsCount / 10);
    let prevStatus = pageState?.props?.pageNumber === 1 ? "disabled" : "";
    let nextStatus =
        pageState?.props?.pageNumber >= pagesCount ? "disabled" : "";
    let pages = [pageState?.props?.pageNumber];

    for (
        let i = pageState?.props?.pageNumber - 1;
        i >= 1 && i >= pageState?.props?.pageNumber - 2;
        i--
    ) {
        pages.push(i);
    }

    for (
        let i = pageState?.props?.pageNumber + 1;
        i <= pagesCount && i <= pageState?.props?.pageNumber + 2;
        i++
    ) {
        pages.push(i);
    }

    pages.sort();

    return (
        <tr>
            <th scope="row" colSpan={columnsCount}>
                <nav className="pagination" aria-label="...">
                    <ul className="pagination">
                        <li className={`page-item ${prevStatus}`}>
                            <a
                                className="page-link"
                                tabIndex={"-1"}
                                aria-disabled="true"
                                onClick={() => pageUtils.setPage(1)}
                            >
                                {general.first}
                            </a>
                        </li>
                        <li className={`page-item ${prevStatus}`}>
                            <a
                                className="page-link"
                                aria-disabled="true"
                                onClick={() =>
                                    pageUtils.setPage(
                                        pageState?.props?.pageNumber - 1
                                    )
                                }
                            >
                                {general.previous}
                            </a>
                        </li>
                        {pages.map((page, index) => (
                            <li
                                className={`page-item ${
                                    page === pageState?.props?.pageNumber
                                        ? "active"
                                        : ""
                                }`}
                                key={index}
                            >
                                <a
                                    className="page-link"
                                    onClick={() => pageUtils.setPage(page)}
                                >
                                    {utils.en2faDigits(page)}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${nextStatus}`}>
                            <a
                                className="page-link"
                                onClick={() =>
                                    pageUtils.setPage(
                                        pageState?.props?.pageNumber + 1
                                    )
                                }
                            >
                                {general.next}
                            </a>
                        </li>
                        <li className={`page-item ${nextStatus}`}>
                            <a
                                className="page-link"
                                onClick={() => pageUtils.setPage(pagesCount)}
                            >
                                {general.last}
                            </a>
                        </li>
                    </ul>
                    <span className="mx-4">
                        {utils.en2faDigits(pageState?.props?.itemsCount)}{" "}
                        {general.records}
                    </span>
                </nav>
            </th>
        </tr>
    );
};

export default TableFooter;
