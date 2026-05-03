/* ❌ بدون use client */
const HOST = process.env.NEXT_PUBLIC_HOST_API_URL ?? '';
const PORT = process.env.NEXT_PUBLIC_HOST_PORT
  ? `:${process.env.NEXT_PUBLIC_HOST_PORT}`
  : '';

const DOMAIN = `${HOST}${PORT}/api/app/`;

interface ListMatchBody {
  match_city_id?: string;
  page_index?: number;
  page_size?: number;
  param?: string;
  sport_field_id?: string;
  query?: string;
}

const ApiServer = {
  listMatch(body: ListMatchBody): string {
    const {
      match_city_id = '',
      query = '',
      page_index,
      page_size,
      param = '',
      sport_field_id = '',
    } = body;

    return `${DOMAIN}match/list?match_city_id=${match_city_id}&query=${query}&page_index=${page_index}&page_size=${page_size}&param=${param}&sport_field_id=${sport_field_id}`;
  },
};

export default ApiServer;
