import { Tag } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllJob } from "../../services/jobService";
import SearchList from "./SearchList";
import GoBack from "../../components/GoBack";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const citySearch = searchParams.get("city") || "";
  const keywordSearch = searchParams.get("keyword") || "";
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getAllJob();
      if (response) {
        const newData = response.filter((item) => {
          const city = citySearch ? item.city.includes(citySearch) : true;
          const keyword = keywordSearch
            ? item.tags.includes(keywordSearch)
            : true;
          const status = item.status;
          return city && keyword && status;
        });
        setData(newData.reverse());
      }
    };
    fetchAPI();
  }, []);

  console.log(data);

  return (
    <>
      <GoBack />

      <div className="mt-20">
        <strong>Kết quả tìm kiếm</strong>
        <span>
          <Tag>{citySearch}</Tag> <Tag>{keywordSearch}</Tag>
        </span>
      </div>
      <SearchList data={data} />
    </>
  );
}

export default Search;
